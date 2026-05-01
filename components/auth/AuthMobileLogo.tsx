/**
 * AuthMobileLogo
 * Logo RWConnect yang tampil hanya di mobile (lg:hidden).
 * Dipakai di LoginPage dan RegisterPage.
 */
export function AuthMobileLogo() {
  return (
    <div className="flex items-center gap-3 mb-8 lg:hidden">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
        <span className="text-white font-bold text-sm">RW</span>
      </div>
      <span className="font-display font-bold text-xl text-slate-900">
        RWConnect
      </span>
    </div>
  );
}
