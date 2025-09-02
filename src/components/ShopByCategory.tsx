import React from "react";
import Image from "next/image";
import { shopByCategoryData } from "@/utils/constants/constant";

const ShopByCategory = () => {
  return (
    <section className="px-6">
      <div className="md:p-6 p-0">
        <h2 className="text-3xl font-bold text-center mt-18 md:mt-22">
          Best Seller Products
        </h2>
        <p className="text-center m-3">Top sale in this week</p>
      </div>

      <div className="flex flex-col   gap-4 md:grid md:grid-cols-6 md:grid-rows-9 md:gap-4">
        {shopByCategoryData.map((cat) => (
          <div
            key={cat.id}
            className={`relative ${cat.colSpan} group overflow-hidden cursor-pointer`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src={cat.image}
              alt={`Shop by Category ${cat.title}`}
              width={1200}
              height={400}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 cursor-pointer"
            />

            {/* Overlay with button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex flex-col text-xl gap-1 bg-white text-gray-500 px-10 py-4 rounded-lg hover:text-[#ba933e] transition cursor-default">
                {cat.title}
                <span className="text-sm">({cat.items} items)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
