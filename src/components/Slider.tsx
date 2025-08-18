'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const Slider = () => {
  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg'
  ]

  const mobileImages = [
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg'
  ]

  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg shadow-lg overflow-hidden ">
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          background-color: #6666 !important;
          hover-background-color: #ba933e !important;
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
        {images.map((image, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="w-full h-full relative">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover hidden md:block"
              />
              <Image
                src={mobileImages[index]}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover md:hidden"
              />

              {/* Content overlay for first slide */}
              {index === 0 && (
                <div className="absolute inset-0 flex items-center left-4 md:left-24">
                  <div className="ml-4 md:ml-16 text-black max-w-md">
                    <p className="text-sm mb-2">
                      <span className="text-gray-600">Quick parcel delivery </span>
                      <span className="text-yellow-600 font-semibold">from $25</span>
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      Normann Copenhagen -
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      Craft salt and pepper grinder
                    </h3>
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                      Start Shopping
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Content overlay for second slide */}
              {index === 1 && (
                <div className="absolute inset-0 flex items-center left-4 md:left-24">
                  <div className="ml-4 md:ml-16 text-black max-w-md">
                    <p className="text-sm mb-2">
                      <span className="text-gray-600">Quick parcel delivery, </span>
                      <span className="text-yellow-600 font-semibold">from $25</span>
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      Wood Minimal Office Chair
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                      Extra 40% off now
                    </h3>
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                      Start Shopping
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Content overlay for third slide */}
              {index === 2 && (
                <div className="absolute inset-0 flex items-center left-4 md:left-24">
                  <div className="ml-4 md:ml-16 text-black max-w-md">
                    <p className="text-sm mb-2">
                      <span className="text-gray-600">Quick parcel delivery, </span>
                      <span className="text-yellow-600 font-semibold">from $25</span>
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      Everyone&apos;s Talking About
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      Sweeper and funnel
                    </h3>
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                      Start Shopping
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider