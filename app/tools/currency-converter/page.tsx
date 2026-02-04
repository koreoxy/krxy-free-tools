"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRates } from "@/lib/fetchRates";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "IDR", name: "Indonesian Rupiah" },
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rates", fromCurrency],
    queryFn: () => fetchRates(fromCurrency),
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  const rate = data?.data?.rates?.[toCurrency] ?? 0;
  const convertedAmount = (parseFloat(amount) || 0) * rate;

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    return Number(value).toLocaleString("en-US");
  };

  const parseNumber = (value: string) => {
    return value.replace(/,/g, "");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Currency Converter
          </h1>
          <p className="text-muted-foreground">
            Convert between multiple currencies with real-time rates
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          {/* Amount Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              Amount
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(amount)}
              onChange={(e) => {
                const rawValue = parseNumber(e.target.value);

                if (!isNaN(Number(rawValue))) {
                  setAmount(rawValue);
                }
              }}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSwap}
              className="p-3 rounded-full bg-secondary hover:bg-primary/10 text-primary transition-colors"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>

          {/* Result */}
          <div className="bg-secondary rounded-lg p-6 text-center">
            {isLoading && (
              <p className="text-sm text-muted-foreground">Loading rates...</p>
            )}

            {isError && (
              <p className="text-sm text-red-500">
                Failed to load exchange rates
              </p>
            )}

            {!isLoading && !isError && (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Converted Amount
                </p>
                <div className="text-4xl font-bold text-foreground">
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-lg text-muted-foreground">
                    {toCurrency}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {amount || 0} {fromCurrency} ={" "}
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {toCurrency}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Exchange Rates
            </h3>
            <p className="text-sm text-muted-foreground">
              Rates are updated regularly and based on current market data
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Fast & Accurate
            </h3>
            <p className="text-sm text-muted-foreground">
              Get instant conversions with high precision calculations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
