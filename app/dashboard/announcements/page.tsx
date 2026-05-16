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

export const metadata: Metadata = {
  title: "Pengumuman",
};

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
      <div
        className="
          space-y-5 sm:space-y-6
          animate-fade-in
          w-full
        ">
        {/* Header */}
        <div
          className="
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-4
          ">
          {/* Title */}
          <div className="min-w-0">
            <h1
              className="
                section-title
                text-2xl sm:text-3xl
                leading-tight
                break-words
              ">
              Pengumuman
            </h1>

            <p
              className="
                section-subtitle
                text-sm sm:text-base
                leading-relaxed
                break-words
                mt-1
              ">
              Informasi terkini untuk warga lingkungan RW
            </p>
          </div>

          {/* Action */}
          {isAdmin && (
            <div
              className="
                w-full sm:w-auto
                flex sm:block
              ">
              <CreateAnnouncementButton />
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="w-full overflow-hidden">
          <AnnouncementFilters currentFilters={searchParams} />
        </div>

        {/* List */}
        <div className="w-full">
          <AnnouncementList
            total={total}
            page={page}
            limit={limit}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </AnnouncementProvider>
  );
}
