"use server";

import { createServerSupabaseClient } from "../lib/supabase/server";

/**
 * Fetch the latest notifications for the authenticated user.
 * Called once on dropdown open via useEffect → startTransition.
 */
export async function getNotifications() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(8);

  return data ?? [];
}

/**
 * Mark a list of notification IDs as read.
 * No revalidatePath needed — the dropdown manages its own local state.
 */
export async function markNotificationsRead(ids: string[]): Promise<void> {
  if (ids.length === 0) return;

  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("notifications")
    .update({ is_read: true })
    .in("id", ids)
    // Safety: only allow marking own notifications
    .eq("user_id", user.id);
}
