"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../lib/supabase/server";
import { CreateAnnouncementSchema } from "../lib/validations/announcements";
import type {
  Announcement,
  AnnouncementCategory,
  AnnouncementPriority,
  CreateAnnouncementPayload,
} from "../types";

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
  fieldErrors?: Record<string, string>;
}

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

export async function getAnnouncementTitle(id: string): Promise<string | null> {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("announcements")
    .select("title")
    .eq("id", id)
    .single();

  return data?.title ?? null;
}

export async function incrementViewCount(id: string): Promise<void> {
  const supabase = createServerSupabaseClient();

  const { error: rpcError } = await supabase.rpc("increment_view_count", {
    announcement_id: id,
  });

  if (rpcError) {
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

  // ✅ Revalidate list agar view count update saat balik ke list
  revalidatePath("/dashboard/announcements");
}

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

  const parsed = CreateAnnouncementSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    const flat = parsed.error.flatten().fieldErrors as Record<
      string,
      string[] | undefined
    >;
    for (const field in flat) {
      const messages = flat[field];
      if (messages && messages.length > 0) fieldErrors[field] = messages[0];
    }
    return { success: false, fieldErrors };
  }

  const { data, error } = await supabase
    .from("announcements")
    .insert({
      ...parsed.data,
      author_id: user.id,
      is_published: true,
      view_count: 0,
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  // ✅ Path yang benar
  revalidatePath("/dashboard/announcements");

  return { success: true, data };
}

export async function deleteAnnouncement(id: string): Promise<ActionResult> {
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

  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  // ✅ Path yang benar
  revalidatePath("/dashboard/announcements");

  return { success: true };
}

export async function toggleAnnouncementPin(
  id: string,
  currentPinned: boolean,
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

  const { data, error } = await supabase
    .from("announcements")
    .update({ is_pinned: !currentPinned })
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return { success: false, error: error?.message };

  // ✅ Path yang benar
  revalidatePath("/dashboard/announcements");

  return { success: true, data };
}
