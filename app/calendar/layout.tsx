import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalender Indonesia",
  description: "Kalender Indonesia dengan hari libur nasional",
  manifest: "/calendar/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Kalender Indonesia",
    statusBarStyle: "default",
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-background">{children}</section>;
}
