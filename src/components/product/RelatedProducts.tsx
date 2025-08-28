// src/components/product/RelatedProducts.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCardItem } from "@/components/common/Card";
import { Product } from "@/types/product"; // <- import the shared Product type

interface RelatedProductsProps {
  productss: Product[];               // use shared Product type
  hovered: number | null;
  setHovered: (index: number | null) => void;
}

const RelatedProducts = ({ productss, hovered, setHovered }: RelatedProductsProps) => {
  return (
    <section className="md:p-6 p-4">
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
      <h2 className="text-xl md:text-3xl font-bold text-center mt-12 md:mt-18 mb-8 md:mb-22">
        You might also like
      </h2>
      <div className="p-4">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          spaceBetween={16}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {productss.map((product, idx) => (
            <SwiperSlide key={product.id} className="!h-auto">
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
    </section>
  );
};

export default RelatedProducts;
