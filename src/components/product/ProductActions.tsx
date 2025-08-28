"use client";
import { CgRuler } from "react-icons/cg";
import { FaRegHeart, FaRegCircleQuestion } from "react-icons/fa6";

interface ProductActionsProps {
  onSizeGuide: () => void;
}

const ProductActions = ({ onSizeGuide }: ProductActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4 px-4">
      <div
        className="flex text-sm items-center mt-1 text-gray-600 gap-1 cursor-pointer hover:text-black"
        onClick={onSizeGuide}
      >
        <CgRuler />
        <span>Size Guide</span>
      </div>
      <span className="flex text-sm text-gray-400 items-center">|</span>
      <div className="flex text-sm items-center mt-1 text-gray-600 gap-1 cursor-pointer hover:text-black">
        <FaRegHeart />
        <span>Add to Watchlist</span>
      </div>
      <span className="flex text-gray-400 items-center">|</span>
      <div className="flex text-sm items-center mt-1 text-gray-600 gap-1 cursor-pointer hover:text-black">
        <FaRegCircleQuestion />
        <span>Add to Compare</span>
      </div>
    </div>
  );
};

export default ProductActions;
