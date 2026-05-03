"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../lib/supabase/server";
import type {
  Aspiration,
  AspirationCategory,
  AspirationStatus,
  CreateAspirationPayload,
} from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GetAspirationsOptions {
  category?: AspirationCategory;
  status?: AspirationStatus;
  page?: number;
  limit?: number;
}

export interface GetAspirationsResult {
  items: Aspiration[];
  total: number;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getAspirations(
  options: GetAspirationsOptions = {},
): Promise<GetAspirationsResult> {
  const { category, status, page = 1, limit = 10 } = options;
  const supabase = createServerSupabaseClient();
  const from = (page - 1) * limit;

  let query = supabase
    .from("aspirations")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);

  return { items: data ?? [], total: count ?? 0 };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createAspiration(
  payload: CreateAspirationPayload,
): Promise<ActionResult> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  if (!payload.title?.trim() || !payload.content?.trim()) {
    return { success: false, error: "Judul dan isi aspirasi wajib diisi." };
  }

  const { error } = await supabase.from("aspirations").insert({
    ...payload,
    author_id: user.id,
    status: "baru",
    upvote_count: 0,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/aspirations");

  return { success: true };
}

export async function upvoteAspiration(
  id: string,
  currentCount: number,
): Promise<ActionResult> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  // Atomic increment via RPC — falls back to manual update if not available
  const { error: rpcError } = await supabase.rpc("increment_upvote_count", {
    aspiration_id: id,
  });

  if (rpcError) {
    const { error } = await supabase
      .from("aspirations")
      .update({ upvote_count: currentCount + 1 })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/aspirations");

  return { success: true };
}

export async function updateAspirationStatus(
  id: string,
  status: AspirationStatus,
): Promise<ActionResult> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  // Role guard — only admin/ketua_rw may change status
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "ketua_rw"].includes(profile.role)) {
    return { success: false, error: "Forbidden" };
  }

  const { error } = await supabase
    .from("aspirations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/aspirations");

  return { success: true };
}
