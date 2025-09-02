
import React from 'react'
import { follow } from '@/utils/constants/constant'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import ClientSwiper from "./ClientSwiper";

const Follow = () => {
  return (
    <div className='p-6  sm:px-12 mb-15'>
         <h2 className="text-3xl font-bold text-center mt-14 md:mt-18 p-2">Follow us on Instagram</h2>
         <p className="text-center text-gray-500 mb-10">@ Rubix Instagram</p>

         {/* Desktop Layout */}
         <div className='hidden md:grid grid-cols-6  gap-8'>
            {follow.map((item) => (
                <div key={item.id} className='relative aspect-square overflow-hidden '>
                    <Image 
                        src={item.img}
                        alt={`Instagram post ${item.id}`}
                        fill
                        className='object-cover hover:scale-105 transition-transform duration-300'
                    />
                </div>
            ))}
         </div>

         <div className='md:hidden'>
            <ClientSwiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    }
                }}
                className="follow-swiper"
            >
                {follow.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className='relative aspect-square overflow-hidden'>
                            <Image 
                                src={item.img}
                                alt={`Instagram post ${item.id}`}
                                fill
                                className='object-cover'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </ClientSwiper>
         </div>
    </div>
  )
}

export default Follow