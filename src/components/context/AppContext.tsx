"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

type LanguageOption = { code: string; label: string; flag: string };

type AppContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (cur: string) => void;
  getConvertedPrice: (price: string | number) => string;
  languages: LanguageOption[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  const rates: Record<string, number> = { USD: 1, GBP: 0.8, JPY: 145, EUR: 0.9 };
  const symbols: Record<string, string> = { USD: "$", GBP: "£", JPY: "¥", EUR: "€" };

  // Flexible function that accepts string or number
  const getConvertedPrice = useMemo(() => {
    return (price: string | number): string => {
      let num = 0;

      if (typeof price === "string") {
        // remove currency symbols and commas, parse to float
        num = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      } else {
        num = price;
      }

      if (isNaN(num)) num = 0; // fallback if parsing fails

      const converted = num * (rates[currency] || 1);
      return `${symbols[currency] || currency} ${converted.toFixed(2)}`;
    };
  }, [currency]);

  const languages: LanguageOption[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "jp", label: "日本語", flag: "🇯🇵" },
  ];

  return (
    <AppContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        getConvertedPrice,
        languages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
