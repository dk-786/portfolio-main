import React from "react";
import { AppProvider } from "@/components/context/AppContext";
import BlogPoster from "@/components/blog/BlogPoster";

export const metadata = {
  title: "My Next.js App",
  description: "Generated with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <BlogPoster />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
