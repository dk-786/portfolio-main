"use client";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AppProvider } from "@/components/context/AppContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ScrollToTop";

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
          <ScrollToTop />
        </AppProvider>
      </body>
    </html>
  );
}
