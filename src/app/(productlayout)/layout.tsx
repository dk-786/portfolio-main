import React from "react";
import BlogPoster from "@/components/blog/BlogPoster";

export const metadata = {
  title: "productlayout",
  description: "Generated with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BlogPoster />
      {children}
    </div>
  );
}
