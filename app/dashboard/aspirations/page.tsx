import type { Metadata } from "next";
import { getAspirations } from "../../../actions/aspirations";
import { getCurrentUserRole } from "../../../actions/announcements"; // shared helper
import type { AspirationCategory, AspirationStatus } from "../../../types";
import { AspirationList } from "../../../components/aspirations/AspirationList";
import { AspirationFormModal } from "../../../components/aspirations/AspirationFormModal";

export const metadata: Metadata = { title: "Aspirasi & Laporan" };

interface PageProps {
  searchParams: {
    category?: AspirationCategory;
    status?: AspirationStatus;
    page?: string;
  };
}

export default async function AspirationsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page ?? "1");
  const limit = 10;

  const [{ items: aspirations, total }, { userId, isAdmin }] =
    await Promise.all([
      getAspirations({
        category: searchParams.category,
        status: searchParams.status,
        page,
        limit,
      }),
      getCurrentUserRole(),
    ]);

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
        aspirations={aspirations}
        total={total}
        page={page}
        limit={limit}
        isAdmin={isAdmin}
        currentUserId={userId ?? ""}
      />
    </div>
  );
}
