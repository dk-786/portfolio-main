import React from 'react'
import { Blogmain1 } from '@/utils/constants/constant'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Blogmain = () => {
    return (
        <div className='w-full p-4 md:p-6'>
            <h2 className="text-3xl font-bold text-center mt-14 md:mt-22 p-2">Latest From Blog</h2>
            <p className="text-center mb-8">Class aptent taciti sociosqu ad litora torquent per</p>
            <div className='md:p-6 gap-6 lg:h-[90dvh]'>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    spaceBetween={20}
                   
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="w-full"
                >
                    {Blogmain1.map((feature, index) => {
                        return (
                            <SwiperSlide key={index} className='bg-white  overflow-hidden'>
                                <div className='w-full'>
                                    <Image
                                        src={feature.img}
                                        alt="blog"
                                        width={400}
                                        height={300}
                                        className="w-full h-auto object-contain" />
                                </div>
                                <div className='py-6'>
                                    <button className="mt-2 px-4 py-1 rounded-md text-white bg-[#ba933e] cursor-pointer text-sm">
                                        Sub Category
                                    </button>
                                    <div className='flex items-center gap-2 py-3'>
                                        <p className='font-bold text-gray-600'>Demo Demo.</p>
                                        <p className='text-gray-500'>{feature.date}</p>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                                        {feature.title}
                                    </h2>
                                    <div>
                                        <p className="text-gray-600 text-sm line-clamp-4">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <button className=" px-8 py-3 rounded-sm text-black border-1 hover:bg-[#ba933e] cursor-pointer text-sm mt-6 transition-all duration-300 hover:text-white">
                                        Read More
                                    </button>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default Blogmain