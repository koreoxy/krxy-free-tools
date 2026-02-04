export const fetchRates = async (from: string) => {
  const res = await fetch(`/api/currency?from=${from}`);
  if (!res.ok) throw new Error("Failed to fetch rates");
  return res.json();
};
