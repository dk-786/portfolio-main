import React from "react";
import { sameCategory, relatedTags } from "@/utils/constants/constant";

const BlogRelated = () => {
  return (
    <div className="lg:flex md:mt-12 mt-2">
      {/* In Same Category */}
      <div className="flex flex-col w-full">
        <h1 className="text-lg md:text-xl font-bold text-black mb-4 py-4 md:py-0">
          In Same Category
        </h1>
        {sameCategory.map((item) => (
          <h1
            key={item.id}
            className="md:text-md text-gray-500 mb-2 border-b pb-2 cursor-pointer hover:text-[#ba933e]"
          >
            {item.title}
          </h1>
        ))}
      </div>

      {/* Related by Tags */}
      <div className="flex flex-col w-full">
        <h1 className="text-lg md:text-xl font-bold text-black lg:mb-4 py-4 md:py-0">
          Related by Tags
        </h1>
        {relatedTags.map((item) => (
          <h1
            key={item.id}
            className="md:text-md text-gray-500 mb-2 border-b pb-2 cursor-pointer hover:text-[#ba933e]"
          >
            {item.title}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default BlogRelated;
