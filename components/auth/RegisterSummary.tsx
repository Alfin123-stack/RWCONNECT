// RegisterSummary.tsx

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
  {
    label: "Nama Lengkap",
    value: data.fullName,
    icon: User,
  },
  {
    label: "Email",
    value: data.email,
    icon: Mail,
  },
  {
    label: "Password",
    value: "••••••••",
    icon: Shield,
  },
  {
    label: "Nomor HP",
    value: data.phone || "—",
    icon: Phone,
  },
  {
    label: "Nomor RT",
    value: data.rtNumber || "—",
    icon: Hash,
  },
  {
    label: "Alamat",
    value: data.address || "—",
    icon: MapPin,
  },
];

/**
 * RegisterSummary
 * Fully responsive:
 * - 320px+
 * - mobile
 * - tablet
 * - desktop
 */
export function RegisterSummary(props: RegisterSummaryProps) {
  const items = SUMMARY_ITEMS(props);

  return (
    <div
      className="
        w-full
        min-w-0

        rounded-3xl

        border
        border-slate-200

        bg-white

        p-4
        sm:p-5

        shadow-sm

        space-y-4
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
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
          <CheckCircle2
            className="
              w-5
              h-5
              text-blue-600
            "
          />
        </div>

        <div className="min-w-0">
          <h3
            className="
              text-sm
              sm:text-base

              font-bold

              text-slate-900
            "
          >
            Ringkasan Data
          </h3>

          <p
            className="
              text-xs
              sm:text-sm

              text-slate-500
            "
          >
            Periksa kembali data kamu
          </p>
        </div>
      </div>

      {/* Items */}
      <div
        className="
          divide-y
          divide-slate-100
        "
      >
        {items.map(({ label, value, icon: Icon }) => {
          const hasValue = value !== "—" && label !== "Password";

          return (
            <div
              key={label}
              className="
                  flex
                  items-start
                  gap-3

                  py-3

                  first:pt-0
                  last:pb-0
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

                    bg-slate-100

                    shrink-0
                  "
              >
                <Icon
                  className="
                      w-4
                      h-4

                      text-slate-500
                    "
                />
              </div>

              {/* Content */}
              <div
                className="
                    flex-1
                    min-w-0
                  "
              >
                <p
                  className="
                      text-[11px]
                      sm:text-xs

                      font-medium

                      text-slate-400
                    "
                >
                  {label}
                </p>

                <p
                  className="
                      mt-0.5

                      text-sm
                      sm:text-[15px]

                      font-semibold

                      text-slate-900

                      break-words
                    "
                >
                  {value}
                </p>
              </div>

              {/* Status */}
              {hasValue && (
                <CheckCircle2
                  className="
                      w-4
                      h-4

                      text-emerald-500

                      shrink-0

                      mt-1
                    "
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
