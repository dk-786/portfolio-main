"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TbBrandPicsart } from "react-icons/tb";

const ProductInfo = () => {
  return (
    <>
      <div className="w-full border-1 mt-6"></div>
      <div className="p-5">
        <div className="flex flex-wrap gap-4 p-1">
          <span className="text-bold">In Stock</span>
          <span className="text-green-700">290 items</span>
        </div>
        <div className="flex flex-wrap gap-4 p-1">
          <span className="text-bold">Reference</span>
          <span className="text-gray-500">demo_1</span>
        </div>
        <div className="flex flex-wrap gap-4 p-1">
          <span className="text-bold">Brand</span>
          <span className="text-gray-500">Studio Design</span>
        </div>
        <div className="flex flex-wrap gap-4 p-1">
          <span className="text-bold">Categories :</span>
          <span className="text-gray-500">
            Home Furniture Lighting Lamp
          </span>
        </div>
        <div className="flex flex-wrap gap-4 p-1 items-center">
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
    </>
  );
};

export default ProductInfo;
