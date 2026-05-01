import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "../components/ui/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "RWConnect — Platform Informasi Warga",
    template: "%s | RWConnect",
  },
  description:
    "Platform digital untuk informasi, pengumuman, dan aspirasi warga lingkungan RW",
  keywords: [
    "rwconnect",
    "informasi warga",
    "pengumuman",
    "rw",
    "rt",
    "aspirasi warga",
  ],
  authors: [{ name: "RWConnect Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a56db",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
