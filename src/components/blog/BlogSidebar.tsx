import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PopularArticles, RecentArticles } from "@/components/articles";
import { TurningTableCard } from "@/components/sidebar";

const categories = [
  { title: "Furniture", sub: ["Lighting Lamp", "Decor Art"] },
  { title: "Chairs", sub: ["Artisan Appeal", "Boho Bliss"] },
  { title: "Sofas" },
  { title: "Construction" },
];

const categoriess = [
  { title: "Category 1", sub: ["Sub Category 1", "Sub Category 2"] },
];

interface Article {
  id: number;
  img: string;
  title: string;
  date: string;
}

interface BlogSidebarProps {
  popularArticles: Article[];
  recentArticles: Article[];
}

const BlogSidebar = ({ popularArticles, recentArticles }: BlogSidebarProps) => {
  const [openCategoryIndexes, setOpenCategoryIndexes] = useState<number[]>([]);
  const [openBlogCategoryIndexes, setOpenBlogCategoryIndexes] = useState<number[]>([]);

  const toggleCategory = (index: number) =>
    setOpenCategoryIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  const toggleBlogCategory = (index: number) =>
    setOpenBlogCategoryIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <aside className="w-full md:w-80 lg:w-90 md:pr-6">
      <h1 className="text-base md:text-lg font-bold mb-4">Home</h1>
      <ul className="space-y-3 md:space-y-4 pt-4 md:pt-6 pb-4 md:pb-6 border-b">
        {categories.map((cat, i) => (
          <li key={i}>
            <button
              onClick={() => toggleCategory(i)}
              className="flex items-center justify-between w-full text-sm md:text-base font-medium text-gray-500 hover:text-[#ba933e]"
            >
              {cat.title}
              {cat.sub && (
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    openCategoryIndexes.includes(i) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            {cat.sub && openCategoryIndexes.includes(i) && (
              <ul className="ml-2 mt-2 md:mt-4 space-y-1 md:space-y-2">
                {cat.sub.map((s, j) => (
                  <li
                    key={j}
                    className="text-gray-500 hover:text-[#ba933e] cursor-pointer text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* BLOG CATEGORIES */}
      <h1 className="text-base md:text-lg font-bold mt-6 md:mt-10">
        Blog Categories
      </h1>
      <ul className="space-y-3 md:space-y-4 pt-4 md:pt-6 pb-4 md:pb-6 border-b">
        {categoriess.map((cat, i) => (
          <li key={i}>
            <button
              onClick={() => toggleBlogCategory(i)}
              className="flex items-center justify-between w-full text-sm md:text-base font-medium text-gray-500 hover:text-[#ba933e]"
            >
              {cat.title}
              {cat.sub && (
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    openBlogCategoryIndexes.includes(i) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            {cat.sub && openBlogCategoryIndexes.includes(i) && (
              <ul className="ml-2 mt-2 md:mt-4 mb-4 md:mb-6 space-y-1 md:space-y-2">
                {cat.sub.map((s, j) => (
                  <li
                    key={j}
                    className="text-gray-500 hover:text-[#ba933e] cursor-pointer text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* POPULAR ARTICLES */}
      <PopularArticles articles={popularArticles} />

      {/* RECENT ARTICLES */}
      <RecentArticles articles={recentArticles} />

      {/* TURNING TABLE CARD */}
      <TurningTableCard />
    </aside>
  );
};

export default BlogSidebar;
