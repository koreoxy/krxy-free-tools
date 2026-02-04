"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchHolidays, Holiday } from "@/lib/holiday";
import clsx from "clsx";

interface CalendarProps {
  year: number;
  month: number;
}

export default function Calendar({ year, month }: CalendarProps) {
  const { data: holidays = [], isLoading } = useQuery<Holiday[]>({
    queryKey: ["holidays", year, month],
    queryFn: () => fetchHolidays(year, month),
    staleTime: 1000 * 60 * 60 * 24, // 24 jam cache
  });

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const monthName = new Date(year, month - 1).toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm flex flex-col">
      {/* Header */}
      <h3 className="text-center font-semibold mb-3">{monthName}</h3>

      {/* Days */}
      <div className="grid grid-cols-7 text-xs text-muted-foreground mb-1">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 text-sm mb-4">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            day,
          ).padStart(2, "0")}`;

          const holiday = holidays.find((h) => h.date === dateStr);
          const dayOfWeek = new Date(year, month - 1, day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <div
              key={day}
              className={clsx(
                "h-9 flex items-center justify-center rounded-md transition",
                holiday && "bg-red-100 text-red-600 font-semibold",
                !holiday && isWeekend && "text-blue-500",
                !holiday && !isWeekend && "text-foreground",
              )}
              title={holiday?.name}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Holiday Info Section */}
      {isLoading && (
        <p className="text-xs text-muted-foreground text-center">
          Memuat hari libur...
        </p>
      )}

      {!isLoading && holidays.length > 0 && (
        <div className="mt-auto border-t pt-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            Hari Libur:
          </p>

          <ul className="space-y-1">
            {holidays.map((holiday) => (
              <li key={holiday.date} className="text-xs flex items-start gap-2">
                <span className="text-red-500 font-medium whitespace-nowrap">
                  {new Date(holiday.date).getDate()}
                </span>
                <span className="text-foreground/80">{holiday.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
