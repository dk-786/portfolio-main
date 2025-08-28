import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { shippingContent } from "@/utils/constants/constant";

interface Product {
  id: number;
  name: string;
  img: string;
  newimg: string;
  dicription: string;
 stock: number | string;
}

interface ProductTabsProps {
  activeTab: "description" | "product" | "details" | "reviews" | "shipping";
  setActiveTab: (tab: "description" | "product" | "details" | "reviews" | "shipping") => void;
  product: Product;
  onWriteReview: () => void;
}

const ProductTabs = ({ activeTab, setActiveTab, product, onWriteReview }: ProductTabsProps) => {
  return (
    <section>
      <div className="flex items-center justify-between px-4 md:px-14 gap-4">
        <div className="flex-1 border-1 border-gray-200"></div>
        <div className="flex gap-4 md:gap-8 font-bold text-base md:text-lg text-black overflow-x-auto whitespace-nowrap scrollbar-hide">
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

      <div className="px-4 md:px-14 py-8 text-sm leading-7 text-gray-700">
        {activeTab === "description" && (
          <div className="space-y-4 px-3">
            <span className=" font-semibold text-gray-500">
              {product.dicription}
            </span>
          </div>
        )}
      </div>

      <div className="px-4 md:px-14 text-sm leading-7 text-gray-700">
        {activeTab === "product" && (
          <div className="space-y-4 px-3">
            <div className="overflow-hidden rounded max-w-sm">
              <Image
                width={400}
                height={300}
                src={product.newimg}
                alt={product.name}
                className="h-15 w-15 object-cover"
              />
            </div>
            <div>
              <p className=" font-medium text-gray-800 ">
                Referance: {product.name}
              </p>
              <p className="font-medium text-gray-800 ">
                Stock: {product.stock}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-14 text-sm leading-7 text-gray-700">
        {activeTab === "reviews" && (
          <div
            className="flex gap-2 cursor-pointer px-3"
            onClick={onWriteReview}
          >
            <MdOutlineEdit className="h-7 w-7" />
            <span>Be the first to write your review!</span>
          </div>
        )}
      </div>

      <div className="px-4 md:px-14 text-sm leading-7 text-gray-700">
        {activeTab === "shipping" && (
          <div className="flex flex-col gap-2 cursor-pointer px-3">
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
  );
};

export default ProductTabs;
