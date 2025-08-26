interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) => {
  return (
    <>
      <h1 className="w-full text-xl text-black font-bold mb-4 px-4">
        Size
      </h1>
      <div className="flex gap-4 text-sm font-semibold px-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-8 h-8 border-2 flex justify-center items-center transition-colors duration-200 cursor-pointer ${
              selectedSize === size ? "border-[#ba933e]" : "border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeSelector;
