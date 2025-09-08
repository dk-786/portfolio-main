"use client";
import React, { useState, useRef } from "react";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  name,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="relative w-full max-w-3xl  mx-auto">
      {/* Main Image */}
      <div
        ref={imgRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full overflow-hidden "
      >
        <img
          src={images[currentIndex]}
          alt={name}
          className={`w-full h-full object-cover transition-transform ${
            zoom ? "scale-150" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        />

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute  left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          &#8594;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 justify-center">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumbnail-${idx}`}
            onClick={() => setCurrentIndex(idx)}
            className={`w-34 h-40 object-cover cursor-pointer border-1 ${
              currentIndex === idx ? "border-black " : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
