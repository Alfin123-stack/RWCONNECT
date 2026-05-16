import type { Metadata } from "next";

import {
  getAspirations,
  getVotedAspirationIds,
} from "../../../actions/aspirations";

import { getCurrentUserRole } from "../../../actions/announcements";

import type { AspirationCategory, AspirationStatus } from "../../../types";

import { AspirationProvider } from "../../../contexts/AspirationContext";

import { AspirationList } from "../../../components/aspirations/AspirationList";

import { AspirationFormModal } from "../../../components/aspirations/AspirationFormModal";

import { AspirationFilters } from "../../../components/aspirations/AspirationFilters";

export const metadata: Metadata = {
  title: "Aspirasi & Laporan",
};

interface PageProps {
  searchParams: {
    category?: AspirationCategory;
    status?: AspirationStatus;
    search?: string;
    page?: string;
  };
}

export default async function AspirationsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page ?? "1");

  const limit = 10;

  const [{ items: aspirations, total }, { userId, isAdmin }, votedIds] =
    await Promise.all([
      getAspirations({
        category: searchParams.category,

        status: searchParams.status,

        search: searchParams.search,

        page,

        limit,
      }),

      getCurrentUserRole(),

      getVotedAspirationIds(),
    ]);

  return (
    <AspirationProvider
      initialAspirations={aspirations}
      initialVotedIds={votedIds}>
      <div
        className="
          space-y-5 sm:space-y-6
          animate-fade-in
          w-full
          min-w-0
        ">
        {/* Header */}
        <div
          className="
            flex flex-col
            sm:flex-row
            sm:items-start
            sm:justify-between

            gap-4
          ">
          {/* Title */}
          <div className="min-w-0">
            <h1
              className="
                section-title

                text-2xl sm:text-3xl

                break-words
                leading-tight
              ">
              Aspirasi &amp; Laporan
            </h1>

            <p
              className="
                section-subtitle

                mt-1.5

                text-sm sm:text-base

                leading-relaxed
                break-words

                max-w-2xl
              ">
              Sampaikan aspirasi dan laporan kamu untuk lingkungan yang lebih
              baik
            </p>
          </div>

          {/* Action */}
          <div
            className="
              w-full sm:w-auto
              flex-shrink-0
            ">
            <AspirationFormModal />
          </div>
        </div>

        {/* Filters */}
        <div className="w-full min-w-0">
          <AspirationFilters currentFilters={searchParams} />
        </div>

        {/* List */}
        <div className="w-full min-w-0">
          <AspirationList
            total={total}
            page={page}
            limit={limit}
            isAdmin={isAdmin}
            currentUserId={userId ?? ""}
          />
        </div>
      </div>
    </AspirationProvider>
  );
}
