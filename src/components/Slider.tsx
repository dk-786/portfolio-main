"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { useAppContext } from "@/components/context/AppContext";
import { sliderData } from "@/utils/constants/constant"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const Slider = () => {
  const { getConvertedPrice } = useAppContext();
  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg shadow-lg overflow-hidden">
      {/* Custom Swiper styles */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          background-color: #6666 !important;
          border-radius: 50%;
          color: white !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 12px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: #a67c2a !important;
        }
        .swiper-pagination-bullet {
          background-color: #ba933e !important;
          opacity: 0.5 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #ba933e !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet:hover {
          background-color: #a67c2a !important;
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="w-full h-full relative">
              {/* Desktop Image */}
              <Image
                src={slide.desktopImage}
                alt={slide.title}
                fill
                className="object-cover hidden md:block"
              />
              {/* Mobile Image */}
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                className="object-cover md:hidden"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center left-4 md:left-24">
                <div className="ml-4 md:ml-16 text-black max-w-md">
                  <p className="text-sm mb-2">
                    <span className="text-gray-600">
                      Quick parcel delivery{" "}
                    </span>
                    <span className="text-yellow-600 font-semibold">
                      from {getConvertedPrice(slide.price)}
                    </span>
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    {slide.subtitle}
                  </h3>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                    Start Shopping
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
