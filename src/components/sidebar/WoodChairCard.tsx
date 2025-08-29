"use client";
import React from "react";
import Image from "next/image";
import { useAppContext } from "@/components/context/AppContext";

const WoodChairCard = () => {
  const { language } = useAppContext();

  const translations: Record<string, { woodChair: string; desc: string; extraOff: string }> = {
    en: {
      woodChair: "Wood Chair",
      desc: "Class aptent taciti sociosqu ad litora",
      extraOff: "Extra 40% off"
    },
    es: {
      woodChair: "Silla de madera",
      desc: "Clase aptent taciti sociosqu ad litora",
      extraOff: "40% extra de descuento"
    },
    ar: {
      woodChair: "كرسي خشبي",
      desc: "كلاس أبتنت تاكتي سوسيوسكو أد ليتورا",
      extraOff: "خصم إضافي 40%"
    },
    pt: {
      woodChair: "Cadeira de madeira",
      desc: "Classe aptent taciti sociosqu ad litora",
      extraOff: "40% de desconto extra"
    },
    ru: {
      woodChair: "Деревянный стул",
      desc: "Класс аптент такиتي социоску ад литора",
      extraOff: "Дополнительная скидка 40%"
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        Special Offer
      </h2>
      <div className="relative w-full overflow-hidden group">
        <Image
          src="/images/poster1.jpg"
          alt="Wood Chair"
          width={300}
          height={200}
          priority
          className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 text-black">
          <h3 className="text-lg font-bold">
            {t.woodChair}
          </h3>
          <p className="text-xs mt-1 text-gray-600">
            {t.desc}
          </p>
          <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm">
            {t.extraOff}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WoodChairCard;
