"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../lib/supabase/server";
import {
  CreateAspirationSchema,
  UpdateAspirationStatusSchema,
} from "../lib/validations/aspirations";
import { z } from "zod";
import type {
  AspirationCategory,
  AspirationStatus,
  CreateAspirationPayload,
} from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GetAspirationsOptions {
  category?: AspirationCategory;
  status?: AspirationStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAspirationsResult {
  items: any[];
  total: number;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

// ─── Validation Schemas ───────────────────────────────────────────────────────

const RespondAspirationSchema = z.object({
  id: z.string().uuid("ID aspirasi tidak valid"),
  admin_response: z
    .string()
    .min(1, "Respon tidak boleh kosong")
    .max(1000, "Respon maksimal 1000 karakter"),
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function flattenFieldErrors(
  flat: Record<string, string[] | undefined>,
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const field in flat) {
    const messages = flat[field];
    if (messages && messages.length > 0) fieldErrors[field] = messages[0];
  }
  return fieldErrors;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getAspirations(
  options: GetAspirationsOptions = {},
): Promise<GetAspirationsResult> {
  const { category, status, search, page = 1, limit = 10 } = options;
  const supabase = createServerSupabaseClient();
  const from = (page - 1) * limit;

  let query = supabase
    .from("aspirations")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);
  if (search) query = query.ilike("title", `%${search}%`);

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

  const parsed = CreateAspirationSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: flattenFieldErrors(
        parsed.error.flatten().fieldErrors as Record<
          string,
          string[] | undefined
        >,
      ),
    };
  }

  const { error } = await supabase.from("aspirations").insert({
    ...parsed.data,
    author_id: user.id,
    status: "baru",
    upvote_count: 0,
  });

  if (error) return { success: false, error: error.message };

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

  const { error: insertError } = await supabase
    .from("aspiration_upvotes")
    .upsert(
      { aspiration_id: id, user_id: user.id },
      { onConflict: "aspiration_id,user_id" },
    );

  if (insertError) return { success: false, error: insertError.message };

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

  revalidatePath("/dashboard/aspirations");
  return { success: true };
}

export async function unvoteAspiration(
  id: string,
  currentCount: number,
): Promise<ActionResult> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error: deleteError } = await supabase
    .from("aspiration_upvotes")
    .delete()
    .eq("aspiration_id", id)
    .eq("user_id", user.id);

  if (deleteError) return { success: false, error: deleteError.message };

  const { error: countError } = await supabase
    .from("aspirations")
    .update({ upvote_count: Math.max(0, currentCount - 1) })
    .eq("id", id);

  if (countError) return { success: false, error: countError.message };

  revalidatePath("/dashboard/aspirations");
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

  const parsed = UpdateAspirationStatusSchema.safeParse({ id, status });
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: flattenFieldErrors(
        parsed.error.flatten().fieldErrors as Record<
          string,
          string[] | undefined
        >,
      ),
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
    .from("aspirations")
    .update({
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/aspirations");
  return { success: true };
}

// ─── Respond to Aspiration ────────────────────────────────────────────────────

export async function respondAspiration(
  id: string,
  admin_response: string,
): Promise<ActionResult> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const parsed = RespondAspirationSchema.safeParse({ id, admin_response });
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: flattenFieldErrors(
        parsed.error.flatten().fieldErrors as Record<
          string,
          string[] | undefined
        >,
      ),
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
    .from("aspirations")
    .update({
      admin_response: parsed.data.admin_response,
      admin_response_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  if (error) return { success: false, error: error.message };

  await supabase
    .from("aspirations")
    .update({ status: "diproses" })
    .eq("id", parsed.data.id)
    .eq("status", "baru");

  revalidatePath("/dashboard/aspirations");
  return { success: true };
}

export async function deleteAdminResponse(id: string): Promise<ActionResult> {
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

  const { error } = await supabase
    .from("aspirations")
    .update({
      admin_response: null,
      admin_response_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/aspirations");
  return { success: true };
}

export async function getVotedAspirationIds(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("aspiration_upvotes")
    .select("aspiration_id")
    .eq("user_id", user.id);

  return data?.map((r) => r.aspiration_id) ?? [];
}

export async function deleteAspiration(id: string): Promise<ActionResult> {
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

  const { error } = await supabase.from("aspirations").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/aspirations");
  return { success: true };
}

export async function getAspirationById(id: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("aspirations")
    .select("*, author:users(full_name, avatar_url)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}
