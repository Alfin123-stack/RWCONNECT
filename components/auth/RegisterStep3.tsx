// RegisterStep3.tsx

"use client";

import { ArrowLeft, CheckCircle2, Shield, BadgeCheck } from "lucide-react";

import { RegisterSummary } from "../../components/auth/RegisterSummary";
import { SubmitButton } from "../../components/auth/SubmitButton";

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
 * Responsive:
 * - 320px+
 * - mobile
 * - tablet
 * - desktop
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
    <div
      className="
        w-full
        min-w-0

        space-y-4
        sm:space-y-5

        animate-fade-in
      "
    >
      {/* Summary */}
      <RegisterSummary
        fullName={fullName}
        email={email}
        phone={phone}
        rtNumber={rtNumber}
        address={address}
      />

      {/* Role Info */}
      <div
        className="
          flex
          items-start
          gap-3

          rounded-2xl

          border
          border-blue-100

          bg-blue-50

          px-4
          py-4
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            items-center
            justify-center

            w-10
            h-10

            rounded-xl

            bg-blue-100

            shrink-0
          "
        >
          <Shield
            className="
              w-5
              h-5
              text-blue-600
            "
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-center
              gap-2
              flex-wrap
            "
          >
            <BadgeCheck
              className="
                w-4
                h-4
                text-blue-600
                shrink-0
              "
            />

            <p
              className="
                text-sm
                font-semibold
                text-blue-900
              "
            >
              Role: Warga
            </p>
          </div>

          <p
            className="
              mt-1

              text-xs
              sm:text-sm

              leading-relaxed

              text-blue-700
            "
          >
            Akun kamu akan didaftarkan sebagai Warga. Pengurus RW dapat
            memperbarui role kamu jika diperlukan.
          </p>
        </div>
      </div>

      {/* Agreement */}
      <label
        className="
          flex
          items-start
          gap-3

          rounded-2xl

          border
          border-slate-200

          bg-white

          p-4

          cursor-pointer

          transition-all
          duration-200

          hover:bg-slate-50
          hover:border-slate-300
        "
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreementChange(e.target.checked)}
          className="
            mt-0.5

            w-4
            h-4

            rounded

            accent-blue-600

            shrink-0
          "
        />

        {/* Text */}
        <p
          className="
            text-xs
            sm:text-sm

            leading-relaxed

            text-slate-600
            break-words
          "
        >
          Saya menyetujui bahwa data yang saya masukkan adalah benar dan saya
          bersedia mengikuti tata tertib warga lingkungan RW.
        </p>
      </label>

      {/* Actions */}
      <div
        className="
          flex
          items-center

          gap-3

          pt-1
        "
      >
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          aria-label="Kembali ke langkah sebelumnya"
          className="
            flex
            items-center
            justify-center

            shrink-0

            w-11
            h-11

            sm:w-12
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            text-slate-700

            transition-all
            duration-200

            hover:bg-slate-50
            hover:border-slate-300

            focus:outline-none
            focus:ring-4
            focus:ring-slate-100

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <ArrowLeft
            className="
              w-4
              h-4
            "
          />
        </button>

        {/* Submit */}
        <SubmitButton
          isLoading={isLoading}
          loadingLabel="Mendaftarkan..."
          label="Daftarkan Akun"
          disabled={!agreed}
          icon={
            <CheckCircle2
              className="
                w-4
                h-4
                shrink-0
              "
            />
          }
          className="
            flex-1
            min-w-0
          "
        />
      </div>
    </div>
  );
}
