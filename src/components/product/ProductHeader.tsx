import { AiFillStar } from "react-icons/ai";
import { MdOutlineMessage, MdOutlineEdit } from "react-icons/md";

interface ProductHeaderProps {
  name: string;
  value: number;
  setValue: (value: number) => void;
  onWriteReview: () => void;
}

const ProductHeader = ({ name, value, setValue, onWriteReview }: ProductHeaderProps) => {
  return (
    <>
      <h1 className="w-full text-2xl md:text-3xl font-bold mb-4 px-4">
        {name}
      </h1>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setValue(n)}
              className="text-left cursor-pointer"
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
        <span className="flex text-gray-400 items-center">|</span>
        <div className="flex items-center mt-1 text-gray-600 gap-1 cursor-pointer">
          <MdOutlineMessage />
          <span>Read Reviews</span>
          <span>(1)</span>
        </div>
        <span className="flex text-gray-400 items-center">|</span>
        <div
          className="flex items-center mt-1 text-gray-600 gap-1 cursor-pointer"
          onClick={onWriteReview}
        >
          <MdOutlineEdit />
          <span>Write a review</span>
        </div>
      </div>
      <span className="text-gray-600 p-4 block">
        Regular fit, round neckline, short sleeves. Made of extra long
        staple pima cotton.
      </span>
    </>
  );
};

export default ProductHeader;
