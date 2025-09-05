"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { categoriess, Blogmain1 } from "@/utils/constants/constant";
import Image from "next/image";
import Pagination from "../components/Pagination";
const SubCategoryPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();

  const slides = Array.isArray(Blogmain1) ? Blogmain1.filter(Boolean) : [];

  // find subcategory by id
  const subcategory = categoriess
    .flatMap((cat) => cat.sub)
    .find((sub) => sub.id === id);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  // slice blogs for current page
  const startIndex = (currentPage - 1) * perPage;
  const paginatedSlides = slides.slice(startIndex, startIndex + perPage);
  const total = slides.length;
  const startItem = total === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + perPage, total);

  if (!subcategory) {
    return <div className="p-5 text-red-500">Subcategory not found.</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Subcategory Info */}
      <section className="flex border-gray-300 p-4 gap-4">
        <img
          src={subcategory.img}
          alt={`subcategory-${subcategory.id}`}
          className="h-80 w-80 object-cover "
        />
        <p className="text-gray-700">{subcategory.description}</p>
      </section>

      {/* Blog Section */}
      <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mt-14 md:mt-14 p-4">
          Latest From Blog
        </h2>

        <div className="md:p-4">
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedSlides.map((feature, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden  transition "
              >
                <div className="w-full">
                  <Image
                    src={feature.img}
                    alt={feature.title ?? "blog"}
                    width={400}
                    height={300}
                    className="w-full h-80 object-cover"
                  />
                </div>

                <div className="py-6 px-4">
                  <button className="mt-2 px-4 py-1 rounded-md text-white bg-[#ba933e] text-sm">
                    Sub Category
                  </button>

                  <div className="flex items-center gap-2 py-3">
                    <p className="font-bold text-gray-600">Demo Demo.</p>
                    <p className="text-gray-500">{feature.date}</p>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                    {feature.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-4">
                    {feature.description}
                  </p>

                  <button
                    className="px-8 py-3 text-black border border-gray-300 hover:bg-[#ba933e] cursor-pointer text-sm mt-6 transition-all duration-300 hover:text-white"
                    onClick={() => router.push(`/category/${feature.id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          <section className="border-t mt-10 flex  justify-between">
            <p className="text-sm text-gray-600 my-10">
              Showing {startItem} - {endItem} of {total} items
            </p>

            {/* Pagination */}
            <Pagination
              total={slides.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPage={perPage}
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export default SubCategoryPage;
