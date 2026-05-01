"use client";

import { ArrowLeft, ArrowRight, Hash, MapPin, Phone } from "lucide-react";
import { FormField } from "../../components/auth/FormField";
import { cn } from "../../utils";

interface RegisterStep2Props {
  phone: string;
  rtNumber: string;
  address: string;
  errors: { phone?: string };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * RegisterStep2
 * Step 2 pendaftaran: nomor HP, nomor RT, alamat (semua opsional).
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
    <div className="space-y-4 animate-fade-in">
      {/* Info banner */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
        <p className="text-xs text-blue-700 font-medium">
          💡 Data pribadi membantu pengurus RW mengenali kamu. Semua field di
          bawah bersifat opsional.
        </p>
      </div>

      {/* Nomor HP */}
      <FormField id="phone" label="Nomor HP" icon={Phone} error={errors.phone}>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={cn(
            "input",
            errors.phone && "border-red-300 focus:ring-red-500",
          )}
          placeholder="08123456789"
          autoComplete="tel"
        />
      </FormField>

      {/* Nomor RT */}
      <FormField id="rt_number" label="Nomor RT" icon={Hash}>
        <input
          id="rt_number"
          type="text"
          value={rtNumber}
          onChange={(e) => onChange("rt_number", e.target.value)}
          className="input"
          placeholder="Contoh: RT 03"
        />
      </FormField>

      {/* Alamat */}
      <FormField id="address" label="Alamat Rumah" icon={MapPin}>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
          className="input"
          placeholder="Jl. Contoh No. 1"
          autoComplete="street-address"
        />
      </FormField>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-shrink-0 px-4"
          aria-label="Kembali ke langkah sebelumnya">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn-primary flex-1 justify-center">
          Lanjut <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
