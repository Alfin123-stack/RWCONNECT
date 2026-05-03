"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../lib/supabase/server";
import type {
  Announcement,
  AnnouncementCategory,
  AnnouncementPriority,
  CreateAnnouncementPayload,
} from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GetAnnouncementsOptions {
  category?: AnnouncementCategory;
  priority?: AnnouncementPriority;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAnnouncementsResult {
  items: Announcement[];
  total: number;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

/**
 * Fetch paginated, filtered announcements.
 */
export async function getAnnouncements(
  options: GetAnnouncementsOptions = {},
): Promise<GetAnnouncementsResult> {
  const { category, priority, search, page = 1, limit = 10 } = options;
  const supabase = createServerSupabaseClient();
  const from = (page - 1) * limit;

  let query = supabase
    .from("announcements")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .eq("is_published", true)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (category) query = query.eq("category", category);
  if (priority) query = query.eq("priority", priority);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);

  return { items: data ?? [], total: count ?? 0 };
}

/**
 * Fetch a single published announcement by ID.
 * Returns null when not found so the caller can trigger notFound().
 */
export async function getAnnouncementById(id: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("*, author:users(full_name, avatar_url)")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Fetch only the title — lightweight call for generateMetadata.
 */
export async function getAnnouncementTitle(id: string): Promise<string | null> {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("announcements")
    .select("title")
    .eq("id", id)
    .single();

  return data?.title ?? null;
}

/**
 * Increment view_count by 1.
 * Uses a Postgres RPC to avoid read-then-write race conditions.
 * Falls back to manual increment if the RPC doesn't exist yet.
 * Errors are swallowed — a failing counter must never break the page.
 */
export async function incrementViewCount(id: string): Promise<void> {
  const supabase = createServerSupabaseClient();

  const { error: rpcError } = await supabase.rpc("increment_view_count", {
    announcement_id: id,
  });

  if (rpcError) {
    // Fallback: read then write
    const { data } = await supabase
      .from("announcements")
      .select("view_count")
      .eq("id", id)
      .single();

    await supabase
      .from("announcements")
      .update({ view_count: (data?.view_count ?? 0) + 1 })
      .eq("id", id);
  }
}

/**
 * Get current user + whether they have admin/ketua_rw role.
 */
export async function getCurrentUserRole(): Promise<{
  userId: string | null;
  isAdmin: boolean;
}> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { userId: null, isAdmin: false };

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin" || profile?.role === "ketua_rw";

  return { userId: user.id, isAdmin };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createAnnouncement(
  payload: CreateAnnouncementPayload,
): Promise<ActionResult<Announcement>> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "ketua_rw"].includes(profile.role)) {
    return { success: false, error: "Forbidden" };
  }

  if (!payload.title?.trim() || !payload.content?.trim()) {
    return { success: false, error: "Judul dan isi pengumuman wajib diisi." };
  }

  const { data, error } = await supabase
    .from("announcements")
    .insert({
      ...payload,
      author_id: user.id,
      is_published: true,
      view_count: 0,
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/announcements");

  return { success: true, data };
}
