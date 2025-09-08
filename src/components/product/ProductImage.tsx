import React, { useState } from "react";

interface ProductImageProps {
  img: string;
  name: string;
  images?: string[];
  onClick?: () => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ img, name, images = [], onClick }) => {
  const [mainImage, setMainImage] = useState(img);

  return (
    <div className="flex flex-col gap-8 w-full md:w-[45%]">
      {/* Main Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={onClick} // open full-screen gallery
      >
        <img
          src={mainImage}
          alt={name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 0 && (
        <div className="flex gap-6 justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-38 h-48 border overflow-hidden cursor-pointer 
                ${mainImage === image ? "border-black" : "border-gray-300"}`}
              onClick={() => setMainImage(image)}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
