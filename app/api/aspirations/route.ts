import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import type { ApiResponse, CreateAspirationPayload } from "../../../types";

// GET /api/aspirations
export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");

  let query = supabase
    .from("aspirations")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    data: { items: data, total: count },
  });
}

// POST /api/aspirations
export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const body: CreateAspirationPayload = await request.json();

  const { data, error } = await supabase
    .from("aspirations")
    .insert({ ...body, author_id: user.id, status: "baru", upvote_count: 0 })
    .select()
    .single();

  if (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse>(
    { success: true, message: "Aspirasi berhasil dikirim", data },
    { status: 201 },
  );
}
