import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gradient mb-4">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke
          dashboard untuk melanjutkan.
        </p>
        <Link href="/dashboard" className="btn-primary">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
