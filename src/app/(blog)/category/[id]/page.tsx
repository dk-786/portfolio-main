"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Blogmain1 } from "@/utils/constants/constant";
import { BlogHeader, BlogRelated, BlogComments } from "@/components/blog";

const Page = () => {
  const [comments, setComments] = useState<string[]>([]);
  const { id } = useParams();

  const blog = Blogmain1.find((b) => b.id === Number(id));

  if (!blog) return <div className="p-6 text-center">Blog not found</div>;

  return (
    <div className="flex-1">
      <BlogHeader blog={blog} />
      <BlogRelated />
      <BlogComments comments={comments} setComments={setComments} />
    </div>
  );
};

export default Page;
