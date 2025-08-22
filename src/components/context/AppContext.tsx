// AppContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

type AppContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (cur: string) => void;
  getConvertedPrice: (priceUSD: number) => string;
  languages: LanguageOption[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  // Currency conversion
  const rates: Record<string, number> = { USD: 1, GBP: 0.8, JPY: 145, EUR: 0.9 };
  const symbols: Record<string, string> = { USD: "$", GBP: "£", JPY: "¥", EUR: "€" };

  const getConvertedPrice = (priceUSD: number): string => {
    const converted = priceUSD * (rates[currency] || 1);
    return `${symbols[currency] || currency} ${converted.toFixed(2)}`;
  };

  // Languages
  const languages: LanguageOption[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "ar", label: "Arabic", flag: "🇸🇦" },
    { code: "pt", label: "Portuguese", flag: "🇵🇹" },
    { code: "ru", label: "Russian", flag: "🇷🇺" },
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
