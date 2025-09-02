"use client";
import React from "react";
import Image from "next/image";
import { posters } from "@/utils/constants/constant";
import { useAppContext } from "@/components/context/AppContext";
import { parsePriceToNumber } from "@/utils/parsePrice";

const TurningTableCard = () => {
  const { getConvertedPrice, language } = useAppContext();
  type PosterTranslationKeys = {
    quickDelivery: string;
    from: string;
    upTo: string;
    desc: string;
    shop: string;
    turningTable: string;
    woodChair: string;
    extraOff: string;
    nutshellChair: string;
    shopBrands: string;
    discount: string;
  };

  // 🔹 Text translations
  const translations: Record<string, PosterTranslationKeys> = {
    en: {
      quickDelivery: "Quick parcel delivery,",
      from: "from",
      upTo: "Up to 70% Off Interior Home Decor",
      desc: "Class aptent taciti sociosqu ad litora",
      shop: "Shop Collection →",
      turningTable: "Turning Table",
      woodChair: "Wood Chair",
      extraOff: "Extra 40% off",
      nutshellChair: "Modern Nutshell Lounge Chair",
      shopBrands: "Shop The New Brands",
      discount: "Up to 40% off now.",
    },
    es: {
      quickDelivery: "Entrega rápida de paquetes,",
      from: "desde",
      upTo: "Hasta 70% de descuento en decoración del hogar",
      desc: "Clase aptent taciti sociosqu ad litora",
      shop: "Comprar colección →",
      turningTable: "Mesa giratoria",
      woodChair: "Silla de madera",
      extraOff: "40% extra de descuento",
      nutshellChair: "Silla moderna de caparazón",
      shopBrands: "Compra las nuevas marcas",
      discount: "Hasta 40% de descuento ahora.",
    },
    ar: {
      quickDelivery: "توصيل سريع للطرود،",
      from: "من",
      upTo: "خصم يصل إلى 70٪ على ديكور المنزل",
      desc: "كلاس أبتنت تاكتي سوسيوسكو أد ليتورا",
      shop: "تسوق المجموعة →",
      turningTable: "طاولة دوارة",
      woodChair: "كرسي خشبي",
      extraOff: "خصم إضافي 40%",
      nutshellChair: "كرسي صالة حديث",
      shopBrands: "تسوق الماركات الجديدة",
      discount: "خصم حتى 40% الآن.",
    },
    pt: {
      quickDelivery: "Entrega rápida de encomendas,",
      from: "de",
      upTo: "Até 70% de desconto em decoração de interiores",
      desc: "Classe aptent taciti sociosqu ad litora",
      shop: "Comprar coleção →",
      turningTable: "Mesa giratória",
      woodChair: "Cadeira de madeira",
      extraOff: "40% de desconto extra",
      nutshellChair: "Poltrona moderna em casca de noz",
      shopBrands: "Compre as novas marcas",
      discount: "Até 40% de desconto agora.",
    },
    ru: {
      quickDelivery: "Быстрая доставка посылок,",
      from: "от",
      upTo: "Скидки до 70% на домашний декор",
      desc: "Класс аптент такити социоску ад литора",
      shop: "Купить коллекцию →",
      turningTable: "Вращающийся стол",
      woodChair: "Деревянный стул",
      extraOff: "Дополнительная скидка 40%",
      nutshellChair: "Современное кресло-раковина",
      shopBrands: "Покупайте новые бренды",
      discount: "Скидки до 40% сейчас.",
    },
  };

  // Pick the right translation
  const t = translations[language] || translations.en;
  return (
    <div className="mb-8 ">

      <div className="py-3 w-full ">

        {posters
          .filter((poster) => [3, 4].includes(poster.id))
          .map((poster, index) => (
            <div
              key={poster.id}
              className="relative w-full overflow-hidden py-2  group"
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                width={600}
                height={800}
                className="block w-full h-auto object-cover transform transition-transform duration-500 ease-in-out"
              />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-black">
                {index === 0 && (
                  <>
                    <h2 className="text-lg sm:text-2xl font-extrabold">
                      {t.turningTable}
                    </h2>
                    <p className="text-xs sm:text-sm mt-1">{t.desc}</p>
                    <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm sm:text-base">
                      {getConvertedPrice(parsePriceToNumber(poster.price))}
                    </span>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h2 className="text-lg sm:text-2xl font-bold">
                      {t.woodChair}
                    </h2>
                    <p className="text-xs sm:text-sm mt-1">{t.desc}</p>
                    <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm sm:text-base">
                      {t.extraOff}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TurningTableCard;
