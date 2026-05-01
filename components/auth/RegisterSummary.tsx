import {
  User,
  Mail,
  Shield,
  Phone,
  Hash,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface RegisterSummaryProps {
  fullName: string;
  email: string;
  phone: string;
  rtNumber: string;
  address: string;
}

const SUMMARY_ITEMS = (data: RegisterSummaryProps) => [
  { label: "Nama Lengkap", value: data.fullName, icon: User },
  { label: "Email", value: data.email, icon: Mail },
  { label: "Password", value: "••••••••", icon: Shield },
  { label: "Nomor HP", value: data.phone || "—", icon: Phone },
  { label: "Nomor RT", value: data.rtNumber || "—", icon: Hash },
  { label: "Alamat", value: data.address || "—", icon: MapPin },
];

/**
 * RegisterSummary
 * Kartu ringkasan data di step 3 pendaftaran.
 * Dipakai di RegisterStep3 dan RegisterPage.
 */
export function RegisterSummary(props: RegisterSummaryProps) {
  const items = SUMMARY_ITEMS(props);

  return (
    <div className="card p-5 space-y-3">
      <h3 className="font-display font-bold text-slate-900 text-sm">
        Ringkasan Data Pendaftaran
      </h3>

      {items.map(({ label, value, icon: Icon }) => {
        const hasValue = value !== "—" && label !== "Password";
        return (
          <div key={label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium">{label}</p>
              <p className="text-sm text-slate-900 font-semibold truncate">
                {value}
              </p>
            </div>
            {hasValue && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
