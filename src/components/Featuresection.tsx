import React from "react";
import { FaPlane, FaCreditCard, FaUndo } from "react-icons/fa";
import { features } from "@/utils/constants/constant";

const Featuresection = () => {
  
  const iconMap = {
    FaPlane: FaPlane,
    FaCreditCard: FaCreditCard,
    FaUndo: FaUndo,
  };

  return (
    <section className="py-12 md:py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <div key={index} className="flex flex-col items-center px-4 md:px-6 py-6 md:py-8">
                <div className="mb-3 md:mb-4">
                  <IconComponent className="text-3xl md:text-4xl text-gray-800" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm md:text-base mb-3 md:mb-4 px-2">{feature.description}</p>
                <a
                  href={feature.link}
                  className="text-black font-medium flex items-center hover:underline hover:text-[#a67c00] text-sm md:text-base"
                >
                  Learn More <span className="ml-1">→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Featuresection;
