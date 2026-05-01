import { Suspense } from "react";

import type { Metadata } from "next";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import { AnnouncementCategory, AnnouncementPriority } from "../../../types";
import { CreateAnnouncementButton } from "../../../components/announcements/CreateAnnouncementButton";
import { AnnouncementFilters } from "../../../components/announcements/AnnouncementFilters";
import { AnnouncementList } from "../../../components/announcements/AnnouncementList";

export const metadata: Metadata = { title: "Pengumuman" };
export const revalidate = 60; // ISR — revalidate every 60 seconds

interface PageProps {
  searchParams: {
    category?: AnnouncementCategory;
    priority?: AnnouncementPriority;
    search?: string;
    page?: string;
  };
}

export default async function AnnouncementsPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient();
  const page = parseInt(searchParams.page ?? "1");
  const limit = 10;
  const from = (page - 1) * limit;

  let query = supabase
    .from("announcements")
    .select("*, author:users(full_name, avatar_url)", { count: "exact" })
    .eq("is_published", true)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + limit - 1);

  if (searchParams.category)
    query = query.eq("category", searchParams.category);
  if (searchParams.priority)
    query = query.eq("priority", searchParams.priority);
  if (searchParams.search)
    query = query.ilike("title", `%${searchParams.search}%`);

  const { data: announcements, count } = await query;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id ?? "")
    .single();
  const isAdmin = profile?.role === "admin" || profile?.role === "ketua_rw";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Pengumuman</h1>
          <p className="section-subtitle">
            Informasi terkini untuk warga lingkungan RW
          </p>
        </div>
        {isAdmin && <CreateAnnouncementButton />}
      </div>

      <AnnouncementFilters currentFilters={searchParams} />

      <Suspense fallback={<AnnouncementListSkeleton />}>
        <AnnouncementList
          announcements={announcements ?? []}
          total={count ?? 0}
          page={page}
          limit={limit}
        />
      </Suspense>
    </div>
  );
}

function AnnouncementListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card p-5 space-y-3">
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
