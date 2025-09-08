"use client";
import React from "react";
import { TERMS } from "@/utils/constants/constant";

const Page = () => {
  return (
    <section className="px-6 md:px-16 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 ">
        Terms and Conditions of Use
      </h1>

      <div className="space-y-8">
        {TERMS.map((rule) => (
          <div
            key={rule.id}
            className="p-10 bg-white  hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-3">{rule.title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {rule.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
