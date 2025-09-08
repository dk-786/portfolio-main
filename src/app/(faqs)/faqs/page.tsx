"use client";
import React, { useState } from "react";
import { FAQS } from "@/utils/constants/constant";

const Page = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-6 md:px-16 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column → questions */}
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <button
              key={faq.id}
              onClick={() => toggleFAQ(faq.id)}
              className={`w-full text-left border rounded-lg px-4 py-3 font-medium transition-all duration-300 ${
                openId === faq.id
                  ? "bg-gray-100 border-gray-400 text-yellow-800"
                  : "bg-white hover:bg-gray-50 text-gray-800"
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>

        {/* Right column → answer */}
        <div className="border rounded-lg p-6 shadow-sm bg-white min-h-[200px] transition-all duration-500 ease-in-out">
          {openId ? (
            <p className="text-gray-700 leading-relaxed">
              {FAQS.find((faq) => faq.id === openId)?.answer}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              Select a question from the left to view the answer.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
