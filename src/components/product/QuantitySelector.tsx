interface QuantitySelectorProps {
  count: number;
  setCount: (count: number | ((prev: number) => number)) => void;
  onAddToCart: () => void;
  showPopup: boolean;
}

const QuantitySelector = ({ count, setCount, onAddToCart, showPopup }: QuantitySelectorProps) => {
  return (
    <>
      <h1 className="w-full text-xl text-black font-bold p-4">Quantity</h1>
      <div className="flex sm:flex-row gap-4 p-4">
        <div className="flex border-2 w-30 h-12 px-4 justify-between">
          <button
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
            className="text-black font-bold cursor-pointer"
          >
            -
          </button>
          <span className="flex items-center justify-center font-bold">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="text-black font-bold cursor-pointer"
          >
            +
          </button>
        </div>
        <button
          className="bg-black text-white px-8 py-2 flex items-center gap-2 rounded hover:bg-[#ba933e]"
          onClick={onAddToCart}
        >
          Add to cart
        </button>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full bg-green-600 text-white text-center py-3 z-50 shadow-md">
            ✅ Added to cart successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default QuantitySelector;
