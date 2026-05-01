import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | RWConnect",
  description: "Daftarkan diri kamu sebagai warga RWConnect",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
