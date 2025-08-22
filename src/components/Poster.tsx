import React from "react";
import Image from "next/image";
import { posters } from "@/utils/constants/constant";
import { useAppContext } from "@/components/context/AppContext";
import { parsePriceToNumber } from "@/utils/parsePrice";

const Poster = () => {
  const { getConvertedPrice, language } = useAppContext();

  // 🔹 Text translations
  const translations: Record<string, any> = {
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
    <div className="w-full items-center justify-center ">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:p-12 p-6">
        {posters
          .filter((poster) => [1, 2].includes(poster.id))
          .map((poster, index) => (
            <div
              key={poster.id}
              className="relative w-full overflow-hidden md:rounded-none rounded-xl group"
            >
              {/* Image */}
              <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Text Overlay */}
              <div
                className={`absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-8 ${
                  index === 0 ? "text-black" : "text-white"
                }`}
              >
                <p className="text-base sm:text-lg font-semibold">
                  {t.quickDelivery}{" "}
                  <span className="text-yellow-600 font-semibold">
                    {t.from} {getConvertedPrice(25)}
                  </span>
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold mt-2 leading-snug">
                  {t.upTo}
                </h2>
                <p
                  className={`mt-3 text-xs sm:text-sm ${
                    index === 0 ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  {t.desc}
                </p>
                <button className="mt-4 sm:mt-5 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-white bg-black hover:bg-[#a67c00] transition">
                  {t.shop}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Second Section */}
      <div className="py-5 flex flex-col md:flex-row gap-6 w-full md:p-12 p-6">
        {/* Two Small Posters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {posters
            .filter((poster) => [3, 4].includes(poster.id))
            .map((poster, index) => (
              <div
                key={poster.id}
                className="relative w-full overflow-hidden md:rounded-none rounded-xl group"
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
                      <h2 className="text-lg sm:text-2xl font-bold">
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

        {/* Single Large Poster */}
        <div className="flex-1">
          {posters
            .filter((poster) => [5].includes(poster.id))
            .map((poster) => (
              <div
                key={poster.id}
                className="relative w-full overflow-hidden rounded-xl  group"
              >
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  width={600}
                  height={800}
                  className="block w-full h-auto object-cover transform transition-transform duration-500 ease-in-out"
                />

                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-black">
                  <h2 className="text-lg sm:text-2xl font-bold">
                    {t.nutshellChair}
                  </h2>
                  <p className="text-xs sm:text-sm mt-1">{t.desc}</p>
                  <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm sm:text-base">
                    {getConvertedPrice(parsePriceToNumber(poster.price))}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Third Section */}
      <div className="mt-5">
        {posters
          .filter((poster) => [6].includes(poster.id))
          .map((poster) => (
            <div
              key={poster.id}
              className="relative w-full  overflow-hidden group"
            >
              {/* Image with responsive height */}
              <Image
                src={poster.src}
                alt={poster.alt}
                width={600}
                height={800}
                className="block w-full h-[430px] sm:h-auto object-cover transform transition-transform duration-500 ease-in-out"
              />

              {/* Text content */}
              <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-12 py-8">
                <div className=" bg-transparent rounded-lg sm:rounded-none p-4 sm:p-0 max-w-xs sm:max-w-md lg:max-w-xl text-left">
                  <p className="text-base sm:text-2xl font-semibold">
                    {t.quickDelivery}{" "}
                    <span className="text-yellow-600 font-semibold">
                      {t.from} {getConvertedPrice(25)}
                    </span>
                  </p>
                  <p className="text-2xl sm:text-5xl font-bold">
                    {t.shopBrands}
                  </p>
                  <p className="text-xl sm:text-4xl mb-2">{t.discount}</p>
                  <p className="text-sm sm:text-base mt-1">{t.desc}</p>
                  <button className="mt-4 sm:mt-5 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-white bg-black hover:bg-[#a67c00] transition">
                    {t.shop}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Poster;
