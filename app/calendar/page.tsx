"use client";

import { useEffect, useState } from "react";
import Calendar from "@/components/Calender";
import RegisterSW from "@/components/RegisterSW";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function CalendarPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const years = [currentYear - 1, currentYear, currentYear + 1];

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  /* ================= PWA INSTALL LISTENER ================= */
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  /* ================= INSTALL HANDLER ================= */
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <RegisterSW />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Kalender Indonesia
        </h1>

        {/* Year Selector */}
        <div className="flex justify-center gap-3 mb-8">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                y === year
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* INSTALL BUTTON */}
        {!isInstalled && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            📲 Install Kalender
          </button>
        )}

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Calendar key={i} year={year} month={i + 1} />
          ))}
        </div>
      </main>
    </>
  );
}
