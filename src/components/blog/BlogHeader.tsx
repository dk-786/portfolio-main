"use client";
import React from "react";
import Image from "next/image";
import {
  MdPerson,
  MdList,
  MdDateRange,
  MdComment,
  MdFavorite,
} from "react-icons/md";

interface BlogHeaderProps {
  blog: {
    title: string;
    img: string;
    description: string;
  };
}

const BlogHeader = ({ blog }: BlogHeaderProps) => {
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
        {blog.title}
      </h1>
      <div className="w-full mb-6">
        <Image
          src={blog.img}
          alt={blog.title}
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 py-2">
        {/* Posted By */}
        <div className="flex items-center gap-1">
          <MdPerson />
          <span className="hover:text-[#ba933e] cursor-pointer">
            Posted by: Demo Demo
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-1">
          <MdList />
          <span className="hover:text-[#ba933e] cursor-pointer">
            In: Sub Category 1
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1">
          <MdDateRange />
          <span>On: Tuesday September 17 2024</span>
        </div>

        {/* Comment */}
        <div className="flex items-center gap-1">
          <MdComment />
          <span>Comments: 0</span>
        </div>

        {/* Hits */}
        <div className="flex items-center gap-1">
          <MdFavorite />
          <span>Hit: 544</span>
        </div>
      </div>
      <div className="prose prose-lg text-gray-700 max-w-none leading-7">
        {blog.description}
      </div>
    </>
  );
};

export default BlogHeader;
