"use client";

import { ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import { RegisterSummary } from "@/components/auth/RegisterSummary";
import { SubmitButton }    from "@/components/auth/SubmitButton";

interface RegisterStep3Props {
  fullName: string;
  email: string;
  phone: string;
  rtNumber: string;
  address: string;
  agreed: boolean;
  isLoading: boolean;
  onAgreementChange: (agreed: boolean) => void;
  onBack: () => void;
}

/**
 * RegisterStep3
 * Step 3 pendaftaran: ringkasan data + persetujuan + submit.
 */
export function RegisterStep3({
  fullName,
  email,
  phone,
  rtNumber,
  address,
  agreed,
  isLoading,
  onAgreementChange,
  onBack,
}: RegisterStep3Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Data summary */}
      <RegisterSummary
        fullName={fullName}
        email={email}
        phone={phone}
        rtNumber={rtNumber}
        address={address}
      />

      {/* Role info */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-blue-800">Role: Warga</p>
          <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
            Akun kamu akan didaftarkan sebagai Warga. Pengurus RW dapat
            memperbarui role kamu jika diperlukan.
          </p>
        </div>
      </div>

      {/* Agreement checkbox */}
      <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-100 transition-colors">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreementChange(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded accent-blue-600 flex-shrink-0"
        />
        <p className="text-xs text-slate-600 leading-relaxed">
          Saya menyetujui bahwa data yang saya masukkan adalah benar dan saya
          bersedia mengikuti tata tertib warga lingkungan RW.
        </p>
      </label>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-shrink-0 px-4"
          disabled={isLoading}
          aria-label="Kembali ke langkah sebelumnya"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <SubmitButton
          isLoading={isLoading}
          loadingLabel="Mendaftarkan..."
          label="Daftarkan Akun"
          disabled={!agreed}
          icon={<CheckCircle2 className="w-4 h-4" />}
          className="flex-1 py-3"
        />
      </div>
    </div>
  );
}
