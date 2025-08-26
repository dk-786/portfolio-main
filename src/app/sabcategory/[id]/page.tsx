"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Blogmain1, popularArticles, recentArticles } from "@/utils/constants/constant";
import {
  BlogSidebar,
  BlogHeader,
  BlogRelated,
  BlogComments,
} from "@/components/blog";

const Page = () => {
  const [comments, setComments] = useState<string[]>([]);
  const { id } = useParams();

  const blog = Blogmain1.find((b) => b.id === Number(id));

  if (!blog) return <div className="p-6 text-center">Blog not found</div>;

  return (
    <div className="w-full max-w-8xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-10">
      {/* LEFT SIDEBAR */}
      <BlogSidebar 
        popularArticles={popularArticles} 
        recentArticles={recentArticles} 
      />

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <BlogHeader blog={blog} />
        <BlogRelated />
        <BlogComments comments={comments} setComments={setComments} />
      </div>
    </div>
  );
};

export default Page;
