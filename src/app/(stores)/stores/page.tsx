"use client";
import React from "react";
import Image from "next/image";
import { STORES } from "@/utils/constants/constant";

const Page = () => {
  return (
    <section className="px-6  md:px-26 py-16">
      <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">
        Our Stores
      </h2>

      <div className="space-y-8">
        {STORES.map((store) => (
          <div
            key={store.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 border  overflow-hidden  transition-shadow duration-300"
          >
            {/* Store Image */}
            <div className="relative h-48 md:h-full">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Store Info */}
            <div className="p-6 flex flex-col justify-center col-span-1 md:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {store.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {store.address}
              </p>
            </div>

            {/* Store Hours */}
            <div className="p-6 bg-gray-50 text-sm">
              <ul className="space-y-1">
                {store.hours.map((h, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="font-medium text-gray-700">{h.day}</span>
                    <span className="text-gray-600">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
