import React from "react";
import BlogPoster from "@/components/blog/BlogPoster";
import { popularArticles, recentArticles } from "@/utils/constants/constant";
import { BlogSidebar } from "@/components/blog";

export const metadata = {
  title: "My Next.js App",
  description: "Generated with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BlogPoster />
      <div className="flex flex-col w-full md:flex-row gap-6 md:gap-8 p-4 md:p-10">
        <BlogSidebar
          popularArticles={popularArticles}
          recentArticles={recentArticles}
        />
        {children}
      </div>
    </div>
  );
}
