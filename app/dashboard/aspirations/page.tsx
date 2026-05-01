import { createServerSupabaseClient } from "../../../lib/supabase/server";
import { AspirationList } from "../../../components/aspirations/AspirationList";
import { AspirationFormModal } from "../../../components/aspirations/AspirationFormModal";
import type { Metadata } from "next";
import type { AspirationCategory, AspirationStatus } from "../../../types";

export const metadata: Metadata = { title: "Aspirasi & Laporan" };

interface PageProps {
  searchParams: {
    category?: AspirationCategory;
    status?: AspirationStatus;
    page?: string;
  };
}

export default async function AsprirationsPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient();
  const page = parseInt(searchParams.page ?? "1");
  const limit = 10;
  const from = (page - 1) * limit;

  let query = supabase
    .from("aspirations")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (searchParams.category)
    query = query.eq("category", searchParams.category);
  if (searchParams.status) query = query.eq("status", searchParams.status);

  const { data: aspirations, count } = await query;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id ?? "")
    .single();
  const isAdmin = profile?.role === "admin" || profile?.role === "ketua_rw";
  const currentUserId = user?.id ?? "";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Aspirasi & Laporan</h1>
          <p className="section-subtitle">
            Sampaikan aspirasi dan laporan kamu untuk lingkungan yang lebih baik
          </p>
        </div>
        <AspirationFormModal />
      </div>

      <AspirationList
        aspirations={aspirations ?? []}
        total={count ?? 0}
        page={page}
        limit={limit}
        isAdmin={isAdmin}
        currentUserId={currentUserId}
      />
    </div>
  );
}
