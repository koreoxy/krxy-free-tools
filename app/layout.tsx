import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Analytics } from '@vercel/analytics/next'
import "./globals.css";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krxykit - Free Tools Web",
  description: "Website Free tools.",
  generator: "koreoxy",
  keywords: [
    "creative tools",
    "design tools",
    "video effects",
    "image manipulation",
    "digital art",
    "generative art",
  ],
  openGraph: {
    title: "Krxykit - Free Tools Web",
    description: "Website Free tools",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground `}>
        <Sidebar />
        <Providers>
          <main className="md:ml-64 pt-20 md:pt-0">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
