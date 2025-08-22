"use client";
import { useAppContext } from "@/components/context/AppContext";

export default function ProductPrice({ priceUSD }: { priceUSD: number }) {
  const { currency } = useAppContext();

  const rates: Record<string, number> = { USD: 1, GBP: 0.8, JPY: 145, EUR: 0.9 };
  const symbols: Record<string, string> = { USD: "$", GBP: "£", JPY: "¥", EUR: "€" };

  const converted = priceUSD * (rates[currency] || 1);

  return (
    <span>
      {symbols[currency] || currency} {converted.toFixed(2)}
    </span>
  );
}
