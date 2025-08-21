"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  products,
  productss,
  shippingContent,
} from "@/utils/constants/constant";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineMessage, MdOutlineEdit } from "react-icons/md";
import Countdown from "react-countdown";
import { CgRuler } from "react-icons/cg";
import { FaRegHeart, FaRegCircleQuestion } from "react-icons/fa6";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TbBrandPicsart } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { ProductCardItem } from "@/components/common/Card";
import { useRouter } from "next/navigation";
import WriteReviewModal from "@/components/modals/WriteReviewModal";
import SizeGuideModal from "@/components/modals/SizeGuideModal";
import CartModal from "@/components/modals/CartModal";
import { cartStore, parsePriceToNumber } from "@/utils/cartStore";
import { useCartItems } from "@/components/hookes/useCartItems";

const Page = () => {
  const params = useParams();
  const idParam = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string | undefined);
  const [hovered, setHovered] = useState<number | null>(null);
  const productId = Number(idParam);
  const allProducts = [...products, ...productss];
  const product = allProducts.find((p) => p.id === productId);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sizes = ["S", "M", "L", "XL"];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "description" | "product" | "details" | "reviews" | "shipping"
  >("description");
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [showCart, setShowCart] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const handleAddToCartPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-green-600 font-bold"> Time&apos;s up!</span>;
    } else {
      return (
        <div className=" text-xl text-gray-500 font-semibold  w-60">
          <div className="flex gap-4 text-xl text-gray-500 font-semibold">
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {days}
              </span>
              <span className="text-sm">Days</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {hours}
              </span>
              <span className="text-sm">Hours</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {minutes}
              </span>
              <span className="text-sm">Min</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {seconds}
              </span>
              <span className="text-sm">Sec</span>
            </div>
          </div>
        </div>
      );
    }
  };

  if (!product) {
    return <h1 className="text-center ">Product Not Found</h1>;
  }

  return (
    <>
      <section className="flex p-8 justify-between w-full ">
        <div className="w-[50%] p-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-full  shadow mb-4"
          />
        </div>
        <div className="w-[50%] py-4 ">
          <h1 className="w-full text-3xl font-bold mb-4 px-4">
            {product.name}
          </h1>
          <div className="flex gap-4 p-4">
            <div className="flex items-center ">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setValue(n)}
                  className=" text-left  cursor-pointer "
                  aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                >
                  <AiFillStar
                    className={`w-4 h-4 ${
                      value >= n ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className=" flex  text-gray-400 items-center">|</span>
            <div className="flex  items-center mt-1  text-gray-600 gap-1 cursor-pointer">
              <MdOutlineMessage />
              <span>Read Reviews</span>
              <span>(1)</span>
            </div>
            <span className=" flex  text-gray-400 items-center">|</span>
            <div
              className="flex  items-center mt-1  text-gray-600 gap-1 cursor-pointer"
              onClick={() => setShowWriteReview(true)}
            >
              <MdOutlineEdit />
              <span>Write a review</span>
            </div>
          </div>

          <span className="text-gray-600  p-4 ">
            Regular fit, round neckline, short sleeves. Made of extra long
            staple pima cotton.
          </span>
          <div className="p-4 text-center ">
            <Countdown
              date={new Date("2025-12-31T23:59:59")}
              renderer={renderer}
            />
          </div>
          <div className="flex items-center gap-2 p-4">
            <p className="text-gray-400 line-through text-lg">
              {product.oldPrice}
            </p>
            <p className="text-[#a67c00] font-bold text-xl">
              {product.newPrice}
            </p>
          </div>

          <h1 className="w-full text-xl text-black font-bold mb-4 px-4">
            Size
          </h1>
          <div className="flex gap-4 text-sm font-semibold px-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 border-2 flex justify-center items-center transition-colors duration-200 cursor-pointer
            ${selectedSize === size ? "border-[#ba933e]" : "border-gray-400"}`}
              >
                {size}
              </button>
            ))}
          </div>

          <h1 className="w-full text-xl text-black font-bold p-4">Color</h1>
          <div className="flex gap-4 text-sm font-semibold px-4">
            {/* White Button */}
            <button
              onClick={() => setSelected("white")}
              className={`w-8 h-8 border-2 rounded-full flex justify-center items-center transition-colors duration-200 bg-white  cursor-pointer
          ${selected === "white" ? "border-[#ba933e]" : "border-gray-400"}`}
            ></button>

            {/* Black Button */}
            <button
              onClick={() => setSelected("black")}
              className={`w-8 h-8 border-2 rounded-full flex justify-center items-center transition-colors duration-200 bg-gray-600 cursor-pointer
          ${selected === "black" ? "border-[#ba933e]" : "border-gray-400"}`}
            ></button>
          </div>

          <h1 className="w-full text-xl text-black font-bold p-4">Quantity</h1>
          <div className="flex gap-4 p-4">
            <div className="flex  border-2 w-30 h-12  px-4 justify-between">
              <button
                onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                className=" text-black  font-bold cursor-pointer"
              >
                -
              </button>
              <span className="flex items-center justify-center font-bold">
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                className=" text-black  font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              className="bg-black text-white px-8 py-2 flex items-center gap-2 rounded hover:bg-[#ba933e]"
              onClick={() => {
                cartStore.add(
                  {
                    id: product.id,
                    name: product.name,
                    img: product.img,
                    price: parsePriceToNumber(product.newPrice),
                    size: selectedSize ?? undefined, // ✅ ensure null, not undefined
                    color: selected ?? undefined, // ✅ ensure null, not undefined
                  },
                  Math.max(1, count)
                );
                setShowCart(false);
                handleAddToCartPopup();
              }}
            >
              Add to cart
            </button>
            {showPopup && (
              <div className="fixed top-0 left-0 w-full bg-green-600 text-white text-center py-3 z-50 shadow-md">
                ✅ Added to cart successfully!
              </div>
            )}
          </div>
          <div className="flex gap-4 px-4">
            <div
              className="flex text-sm  items-center mt-1  text-gray-600 gap-1 cursor-pointer hover:text-black"
              onClick={() => setShowSizeGuide(true)}
            >
              <CgRuler />
              <span>Size Guide </span>
            </div>
            <span className=" flex text-sm  text-gray-400 items-center">|</span>
            <div className="flex text-sm items-center mt-1  text-gray-600 gap-1 cursor-pointer hover:text-black">
              <FaRegHeart />
              <span>Add to Watchlist </span>
            </div>
            <span className=" flex  text-gray-400 items-center">|</span>
            <div className="flex text-sm items-center mt-1  text-gray-600 gap-1 cursor-pointer hover:text-black">
              <FaRegCircleQuestion />
              <span>Add to Compare </span>
            </div>
          </div>
          <div className="w-full border-1 mt-6 "></div>
          <div className="p-5 ">
            <div className="flex gap-4 p-1">
              <span className=" text-bold">In Stock</span>
              <span className="text-green-700">290 items</span>
            </div>
            <div className="flex gap-4 p-1">
              <span className=" text-bold">Reference</span>
              <span className="text-gray-500">demo_1</span>
            </div>
            <div className="flex gap-4 p-1">
              <span className=" text-bold">Brand</span>
              <span className="text-gray-500">Studio Design</span>
            </div>
            <div className="flex gap-4 p-1">
              <span className=" text-bold">Categories :</span>
              <span className="text-gray-500">
                Home Furniture Lighting Lamp
              </span>
            </div>
            <div className="flex gap-4 p-1 items-center">
              <span className="font-bold">Share :</span>

              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  className="text-blue-700 cursor-pointer"
                  size={20}
                />
              </Link>

              <Link
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-400 cursor-pointer" size={20} />
              </Link>

              <Link
                href="https://picsart.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandPicsart
                  className="text-red-400 cursor-pointer"
                  size={22}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between px-14 gap-4">
          <div className="flex-1 border-1 border-gray-200"></div>

          <div className="flex gap-8 font-bold text-lg text-black ">
            <span
              onClick={() => setActiveTab("description")}
              className={`cursor-pointer duration-300 ${
                activeTab === "description"
                  ? "text-[#ba933e] underline underline-offset-6"
                  : "hover:text-[#ba933e] hover:underline hover:underline-offset-6"
              }`}
            >
              Description
            </span>
            <span
              onClick={() => setActiveTab("product")}
              className={`cursor-pointer duration-300 ${
                activeTab === "product"
                  ? "text-[#ba933e] underline underline-offset-6"
                  : "hover:text-[#ba933e] hover:underline hover:underline-offset-6"
              }`}
            >
              Product Details
            </span>

            <span
              onClick={() => setActiveTab("reviews")}
              className={`cursor-pointer duration-300 ${
                activeTab === "reviews"
                  ? "text-[#ba933e] underline underline-offset-6"
                  : "hover:text-[#ba933e] hover:underline hover:underline-offset-6"
              }`}
            >
              Reviews
            </span>
            <span
              onClick={() => setActiveTab("shipping")}
              className={`cursor-pointer duration-300 ${
                activeTab === "shipping"
                  ? "text-[#ba933e] underline underline-offset-6"
                  : "hover:text-[#ba933e] hover:underline hover:underline-offset-6"
              }`}
            >
              Shipping & Return
            </span>
          </div>

          <div className="flex-1 border-1 border-gray-200"></div>
        </div>
        <div className="px-14 py-8 text-sm leading-7 text-gray-700">
          {activeTab === "description" && (
            <div className="space-y-4">
              <span className="ml-2 font-semibold text-gray-500">
                {product.dicription}
              </span>
            </div>
          )}
        </div>
        <div className="px-14  text-sm leading-7 text-gray-700">
          {activeTab === "product" && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded  max-w-sm">
                <img
                  src={product.newimg}
                  alt={product.name}
                  className=" h-15 w-15  object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Referance: {product.name}
                </p>
                <p className="font-medium text-gray-800">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="px-14  text-sm leading-7 text-gray-700">
          {activeTab === "reviews" && (
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => setShowWriteReview(true)}
            >
              <MdOutlineEdit className="h-7 w-7" />
              <span> Be the first to write your review!</span>
            </div>
          )}
        </div>
        <div className="px-14  text-sm leading-7 text-gray-700">
          {activeTab === "shipping" && (
            <div className=" flex flex-col gap-2 cursor-pointer">
              {shippingContent.map((item) => (
                <div key={item.id} className="mb-2">
                  <span className="font-bold text-xl">{item.title}</span>
                  <span className="text-gray-500 block">{item.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <WriteReviewModal
        open={!!showWriteReview}
        onClose={() => setShowWriteReview(false)}
        product={{ id: product.id, img: product.img, name: product.name }}
      />
      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
      <CartModal
        open={showCart}
        onClose={() => setShowCart(false)}
        items={useCartItems()}
        onIncQty={(cartId: string) => cartStore.inc(cartId)} // ✅ use cartId
        onDecQty={(cartId: string) => cartStore.dec(cartId)} // ✅ use cartId
        onRemove={(cartId: string) => cartStore.remove(cartId)} // ✅ use cartId
      />

      <section className="md:p-6 p-0">
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
        <h2 className="text-3xl font-bold text-center mt-18 md:mb-22">
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
    </>
  );
};

export default Page;
