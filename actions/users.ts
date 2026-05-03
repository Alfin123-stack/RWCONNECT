"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../lib/supabase/server";
import type { UserRole } from "../types";

// ─── Profile ──────────────────────────────────────────────────────────────────

/**
 * Fetch the full profile row for the currently authenticated user.
 * Returns null when there is no session — caller should redirect.
 */
export async function getCurrentUserProfile() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  return profile;
}

/**
 * Persist profile changes (full_name, phone, rt_number, etc.).
 * Only the authenticated user may update their own row.
 */
export async function updateUserProfile(
  updates: Partial<{
    full_name: string;
    phone: string;
    rt_number: string;
    avatar_url: string;
  }>,
) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" as const };

  const { error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/profile");

  return { success: true };
}

// ─── Admin — user management ──────────────────────────────────────────────────

/**
 * Fetch all registered users, newest first.
 * Enforces admin/ketua_rw guard on the server.
 * Returns null when the caller is not authorised — caller should redirect.
 */
export async function getAllUsers() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "ketua_rw"].includes(profile.role)) return null;

  const { data: users, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  return { users: users ?? [], count: count ?? 0, currentUserId: user.id };
}

/**
 * Change the role of a target user.
 * Guards: caller must be admin/ketua_rw and cannot change their own role.
 */
export async function updateUserRole(
  targetUserId: string,
  newRole: UserRole,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  if (user.id === targetUserId) {
    return {
      success: false,
      error: "Kamu tidak bisa mengubah role diri sendiri.",
    };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "ketua_rw"].includes(profile.role)) {
    return { success: false, error: "Forbidden" };
  }

  const { error } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", targetUserId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/users");

  return { success: true };
}
