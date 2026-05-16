// RegisterStep2.tsx

"use client";

import { ArrowLeft, ArrowRight, Hash, MapPin, Phone, Info } from "lucide-react";

import { FormField } from "../../components/auth/FormField";
import { cn } from "../../utils";

interface RegisterStep2Props {
  phone: string;
  rtNumber: string;
  address: string;

  errors: {
    phone?: string;
  };

  onChange: (field: string, value: string) => void;

  onNext: () => void;

  onBack: () => void;
}

/**
 * RegisterStep2
 * Responsive:
 * - 320px+
 * - mobile
 * - tablet
 * - desktop
 */
export function RegisterStep2({
  phone,
  rtNumber,
  address,
  errors,
  onChange,
  onNext,
  onBack,
}: RegisterStep2Props) {
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
      {/* Info Banner */}
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
          py-3
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            items-center
            justify-center

            w-9
            h-9

            rounded-xl

            bg-blue-100

            shrink-0
          "
        >
          <Info
            className="
              w-4
              h-4
              text-blue-700
            "
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p
            className="
              text-xs
              sm:text-sm

              text-blue-800

              leading-relaxed
              break-words
            "
          >
            Data pribadi membantu pengurus RW mengenali kamu. Semua field di
            bawah bersifat opsional.
          </p>
        </div>
      </div>

      {/* Phone */}
      <FormField id="phone" label="Nomor HP" icon={Phone} error={errors.phone}>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="08123456789"
          autoComplete="tel"
          className={cn(
            `
            w-full
            min-w-0

            h-11
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4

            text-sm
            sm:text-base

            text-slate-900

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            `,
            errors.phone &&
              `
              border-red-300
              focus:border-red-500
              focus:ring-red-100
            `,
          )}
        />
      </FormField>

      {/* RT Number */}
      <FormField id="rt_number" label="Nomor RT" icon={Hash}>
        <input
          id="rt_number"
          type="text"
          value={rtNumber}
          onChange={(e) => onChange("rt_number", e.target.value)}
          placeholder="Contoh: RT 03"
          className="
            w-full
            min-w-0

            h-11
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4

            text-sm
            sm:text-base

            text-slate-900

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </FormField>

      {/* Address */}
      <FormField id="address" label="Alamat Rumah" icon={MapPin}>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Jl. Contoh No. 1"
          autoComplete="street-address"
          className="
            w-full
            min-w-0

            h-11
            sm:h-12

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4

            text-sm
            sm:text-base

            text-slate-900

            placeholder:text-slate-400

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </FormField>

      {/* Navigation */}
      <div
        className="
          flex
          items-center

          gap-3

          pt-2
        "
      >
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
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
          "
        >
          <ArrowLeft
            className="
              w-4
              h-4
            "
          />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          className="
            flex-1
            min-w-0

            inline-flex
            items-center
            justify-center
            gap-2

            h-11
            sm:h-12

            rounded-2xl

            px-4

            text-sm
            sm:text-base

            font-semibold
            text-white

            bg-gradient-to-r
            from-blue-600
            to-cyan-500

            shadow-lg
            shadow-blue-500/20

            transition-all
            duration-200

            hover:scale-[1.01]
            hover:shadow-xl
            hover:shadow-blue-500/30

            active:scale-[0.99]

            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          "
        >
          <span className="truncate">Lanjut</span>

          <ArrowRight
            className="
              w-4
              h-4
              shrink-0
            "
          />
        </button>
      </div>
    </div>
  );
}
