import React, { useState } from "react";
import { productss } from "@/utils/constants/constant";
import { ProductCardItem } from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid"; 
import { useRouter } from "next/navigation";

const Products = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="md:p-6 p-0">
      <h2 className="text-3xl font-bold text-center mt-18 md:mt-22">
        Best Seller Products
      </h2>
      <p className="text-center mt-3">Top sale in this week</p>

      {/* Mobile Swiper */}
      <div className="block md:hidden">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          loop={true}
          className="w-full"
        >
          {productss.map((product, idx) => (
            <SwiperSlide key={product.id} className="!w-full p-6">
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

      {/* Desktop Swiper grid: 2 rows x 4 cols */}
      <div className="hidden md:block p-6">
        <Swiper
          modules={[Navigation, Grid]}
          slidesPerView={4}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={30}
          slidesPerGroup={4}
          loop={true}
          className="w-full"
          style={{ height: "auto" }}
        >
          {productss.map((product, idx) => (
            <SwiperSlide
              key={product.id}
              className="flex flex-col h-full"
              onClick={() => router.push(`/card/${product.id}`)}
            >
              <ProductCardItem
                product={product}
                isMobile={false}
                hovered={hovered}
                setHovered={setHovered}
                index={idx}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Products;
