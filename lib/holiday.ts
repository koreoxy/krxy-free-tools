export type Holiday = {
  date: string;
  name: string;
};

export async function fetchHolidays(
  year: number,
  month: number,
): Promise<Holiday[]> {
  const res = await fetch(
    `https://libur.deno.dev/api?year=${year}&month=${month}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch holidays");
  }

  return res.json();
}
