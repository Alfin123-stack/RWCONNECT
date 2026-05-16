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
    <div className="px-3 sm:px-0">
      <p
        className="
          text-center
          text-[11px] sm:text-xs
          text-slate-400
          pt-1
          leading-relaxed
          break-words
        ">
        Halaman <span className="font-semibold text-slate-500">{page}</span>{" "}
        dari <span className="font-semibold text-slate-500">{totalPages}</span>
        <span className="hidden xs:inline">
          {" "}
          • Total <span className="font-semibold text-slate-500">
            {total}
          </span>{" "}
          pengumuman
        </span>
      </p>

      {/* Mobile fallback */}
      <p
        className="
          xs:hidden
          text-center
          text-[10px]
          text-slate-400
          mt-1
        ">
        Total {total} pengumuman
      </p>
    </div>
  );
}
