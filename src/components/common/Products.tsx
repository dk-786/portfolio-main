import React, { useState } from 'react'
import { products, productss } from '@/utils/constants/constant'
import { ProductCardItem } from './Card'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

const Products = () => {
  const [hovered, setHovered] = useState<number | null>(null);
   const router = useRouter();

  return (
    <div className="md:p-6 p-0">
      <h2 className="text-3xl font-bold text-center mt-18 md:mt-22">Best Seller Products</h2>
      <p className="text-center mb-8">Top sale in this week</p>
      
      {/* Swiper for mobile, grid for desktop */}
      <div className="block md:hidden ">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          className=" w-full"
          loop={true}
        >
          {productss.map((product, idx) => (
            <SwiperSlide key={product.id} className="!w-full p-6" >
              <ProductCardItem
                product={product}
                isMobile={true}
                hovered={hovered}
                setHovered={setHovered}
                index={idx}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Grid for desktop */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6">
        {productss.map((product, idx) => (
          <div key={product.id} className="flex flex-col h-full" onClick={() => router.push(`/card/${product.id}`)}>
            <ProductCardItem
              product={product}
              isMobile={false}
              hovered={hovered}
              setHovered={setHovered}
              index={idx}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products