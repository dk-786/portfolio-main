import React from 'react'
import { brandlogo } from '@/utils/constants/constant'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Brandlogo = () => {
  return (
    <section className='px-4 sm:px-12'>
        <div className='border-y-1 border-gray-200 w-full p-4'>
            {/* Desktop Layout */}
            <div className='hidden md:flex justify-between items-center'>
                {brandlogo.map((brand) => (
                    <div key={brand.id} className='inline-block p-4'>
                        <Image 
                        src={brand.img}
                         alt={brand.img} 
                         width={200} 
                         height={200} 
                         />
                    </div>
                ))}
            </div>
            
            {/* Mobile Swiper */}
            <div className='md:hidden'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className="brand-swiper"
                >
                    {brandlogo.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className='flex justify-center items-center p-8'>
                                <Image 
                                src={brand.img}
                                 alt={brand.img} 
                                 width={300} 
                                 height={300} 
                                 />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </section>
  )
}

export default Brandlogo