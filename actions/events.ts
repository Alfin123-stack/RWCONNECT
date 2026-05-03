// ─── Calendar ─────────────────────────────────────────────────────────────────

import { createServerSupabaseClient } from "../lib/supabase/server";

/**
 * Fetch events from the start of the current month, ordered ascending.
 */
export async function getMonthEvents() {
  const supabase = createServerSupabaseClient();

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  ).toISOString();

  const { data, error } = await supabase
    .from("events")
    .select("*, organizer:users(full_name)")
    .gte("start_date", startOfMonth)
    .order("start_date", { ascending: true })
    .limit(50);

  if (error) throw new Error(error.message);

  return data ?? [];
}
