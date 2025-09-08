import React from "react";
import BlogPoster from "@/components/blog/BlogPoster";
import { popularArticles, recentArticles } from "@/utils/constants/constant";
import { BlogSidebar } from "@/components/blog";

export const metadata = {
  title: "about us",
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
