export default function PaginationInfo({
  total,
  page,
  limit,
}: {
  total: number;
  page: number;
  limit: number;
}) {
  const totalPages = Math.ceil(total / limit);
  return (
    <p className="text-center text-xs text-slate-400 pt-1">
      Halaman {page} dari {totalPages} • Total {total} pengumuman
    </p>
  );
}
