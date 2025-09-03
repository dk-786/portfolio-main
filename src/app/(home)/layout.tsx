import React from "react";

export const metadata = {
  title: "My Next.js App",
  description: "Generated with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
