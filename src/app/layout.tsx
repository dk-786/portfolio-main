"use client";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AppProvider } from "@/components/context/AppContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AppProvider>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
        </AppProvider>
      </body>
    </html>
  );
}
