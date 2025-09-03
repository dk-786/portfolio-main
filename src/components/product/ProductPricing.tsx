"use client";

interface ProductPricingProps {
  oldPrice: number; 
  newPrice: number; 
  getConvertedPrice: (price: number) => string;
}

const ProductPricing = ({ 
  oldPrice, 
  newPrice, 
  getConvertedPrice, 
}: ProductPricingProps) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <p className="text-gray-400 line-through text-lg">
        {getConvertedPrice(oldPrice)}
      </p>
      <p className="text-[#a67c00] font-bold text-xl">
        {getConvertedPrice(newPrice)} 
      </p>
    </div>
  );
};

export default ProductPricing;