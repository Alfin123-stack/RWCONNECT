import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getAnnouncements,
  getCurrentUserRole,
} from "../../../actions/announcements";
import type {
  AnnouncementCategory,
  AnnouncementPriority,
} from "../../../types";
import { CreateAnnouncementButton } from "../../../components/announcements/CreateAnnouncementButton";
import { AnnouncementFilters } from "../../../components/announcements/AnnouncementFilters";
import { AnnouncementList } from "../../../components/announcements/AnnouncementList";

export const metadata: Metadata = { title: "Pengumuman" };
export const revalidate = 60;

interface PageProps {
  searchParams: {
    category?: AnnouncementCategory;
    priority?: AnnouncementPriority;
    search?: string;
    page?: string;
  };
}

export default async function AnnouncementsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page ?? "1");
  const limit = 10;

  // Both calls run in parallel — no waterfall
  const [{ items: announcements, total }, { isAdmin }] = await Promise.all([
    getAnnouncements({
      category: searchParams.category,
      priority: searchParams.priority,
      search: searchParams.search,
      page,
      limit,
    }),
    getCurrentUserRole(),
  ]);

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
          announcements={announcements}
          total={total}
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
