"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
