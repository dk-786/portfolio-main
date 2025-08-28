"use client";
interface ProductPricingProps {
  oldPrice: string;
  newPrice: string;
  getConvertedPrice: (price: number) => string;
  parsePriceToNumber: (price: string) => number;
}

const ProductPricing = ({ 
  oldPrice, 
  newPrice, 
  getConvertedPrice, 
  parsePriceToNumber 
}: ProductPricingProps) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <p className="text-gray-400 line-through text-lg">
        {getConvertedPrice(parsePriceToNumber(oldPrice))}
      </p>
      <p className="text-[#a67c00] font-bold text-xl">
        {getConvertedPrice(parsePriceToNumber(newPrice))}
      </p>
    </div>
  );
};

export default ProductPricing;
