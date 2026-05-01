import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | RWConnect",
  description: "Masuk ke platform informasi warga RWConnect",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
