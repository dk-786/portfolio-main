
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { products } from "@/utils/constants/constant";
import { productss } from "@/utils/constants/constant";
import { cartStore, parsePriceToNumber } from "@/utils/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import { useAppContext } from "@/components/context/AppContext";
import { Product } from "@/types/product";
import ClientSwiper from "@/components/ClientSwiper";

/** addToCart now uses Product rather than any */
const addToCart = (product: Product, onSuccess?: () => void) => {
  if (!product.available) {
    alert("This item is out of stock.");
    return;
  }

  cartStore.add(
    {
      id: product.id as number,
      name: (product.name as string) || "",
      img: (product.img as string) || "",
      price: parsePriceToNumber(String(product.newPrice ?? "")),
    },
    1
  );

  if (onSuccess) onSuccess();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Common Card Component
export interface ProductCardProps {
  product: Product;
  isMobile?: boolean;
  hovered: number | null;
  setHovered: (id: number | null) => void;
  index: number;
  gridCols?: number;
}

export const ProductCardItem = ({
  product,
  isMobile = false,
  hovered,
  setHovered,
  index,
  gridCols,
}: ProductCardProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const { getConvertedPrice } = useAppContext();

  const handleAddToCartPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Card */}
      <div
        className="overflow-hidden h-100 shadow relative group bg-white flex-1 flex flex-col cursor-pointer"
        onMouseEnter={() => setHovered(Number(product.id))}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Discount Badge - Only show on desktop */}
        {!isMobile && product.discount && (
          <span className="absolute top-3 left-3 bg-[#a67c00] text-white text-sm font-semibold px-2 py-1 rounded">
            {product.discount}
          </span>
        )}

        {/* Icons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 ${
            isMobile
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 transition-all duration-300"
          }`}
        >
          <button className="bg-white shadow p-2 rounded hover:bg-gray-100">
            <FaHeart size={20} className="text-gray-700" />
          </button>
          <button className="bg-white shadow p-2 rounded hover:bg-gray-100">
            <IoMdRefresh size={20} className="text-gray-700" />
          </button>
        </div>

        <Image
          src={
            index === (products as Product[]).length - 1
              ? (product.img as string)
              : hovered === Number(product.id)
              ? (product.hoverImg as string) || (product.img as string)
              : (product.img as string)
          }
          alt={(product.name as string) || "Product image"}
          width={300}
          height={300}
          className={`w-full ${isMobile ? "h-auto" : "h-full"} object-cover`}
          onClick={() => router.push(`/card/${product.id}`)}
          unoptimized
        />

        {/* Buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center gap-4 py-3 ${
            isMobile
              ? ""
              : "opacity-0 group-hover:opacity-100 transition-all duration-300"
          }`}
        >
          <button
            disabled={!product.available}
            className={`px-4 py-2 flex items-center gap-2 rounded text-white font-semibold ${
              product.available
                ? "bg-black hover:bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, handleAddToCartPopup);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <BsCart />
            {product.available ? "Add to Cart" : "Out of Stock"}
          </button>

          {!isMobile && (
            <button
              className={`bg-black text-white flex items-center justify-center rounded hover:bg-gray-800 cursor-pointer
               ${gridCols === 4 ? "p-2" : "px-4 py-2 gap-2"}`}
            >
              <AiOutlineEye />
              {gridCols !== 4 && "Quick view"}
            </button>
          )}
        </div>

        {/* Success popup */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full bg-green-600 text-white text-center py-3 z-50 shadow-md">
            ✅ Added to cart successfully!
          </div>
        )}
      </div>

      {/* Product Info BELOW the card */}
      <div className="mt-4">
        <h3 className="text-gray-800 font-medium text-lg hover:text-[#a67c00] ">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 line-through text-sm">
            {getConvertedPrice(parsePriceToNumber(String(product.oldPrice ?? "")))}
          </p>
          <p className="text-[#a67c00] font-bold text-lg">
            {getConvertedPrice(parsePriceToNumber(String(product.newPrice ?? "")))}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductCard = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  // annotate arrays as Product[] for proper typing in map callbacks
  const mobileList = productss as Product[];
  const desktopList = products as Product[];

  return (
    <div className="md:p-6 p-0">
      <h2 className="text-3xl font-bold text-center mt-18 md:mt-22">
        Trending Products
      </h2>
      <p className="text-center mb-8">Top view in this week</p>

      {/* Swiper for mobile, grid for desktop */}
      <div className="block md:hidden ">
        <ClientSwiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          navigation={false}
          className=" w-full"
        >
          {mobileList.map((product: Product, idx: number) => (
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
        </ClientSwiper>
      </div>

      {/* Grid for desktop */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6">
        {desktopList.map((product: Product, idx: number) => (
          <div
            key={product.id}
            className="flex flex-col "
            onClick={() => {
              router.push(`/card/${product.id}`);
            }}
          >
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
  );
};

export default ProductCard;
