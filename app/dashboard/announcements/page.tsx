import type { Metadata } from "next";
import {
  getAnnouncements,
  getCurrentUserRole,
} from "../../../actions/announcements";
import type {
  AnnouncementCategory,
  AnnouncementPriority,
} from "../../../types";
import { AnnouncementProvider } from "../../../contexts/AnnouncementContext";
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
    <AnnouncementProvider initialAnnouncements={announcements}>
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

        <AnnouncementList
          total={total}
          page={page}
          limit={limit}
          isAdmin={isAdmin}
        />
      </div>
    </AnnouncementProvider>
  );
}
