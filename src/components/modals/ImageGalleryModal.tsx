"use client";
import React, { useState } from "react";
import { FaTimes, FaDownload, FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

interface ImageGalleryModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  open,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  if (!open) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = `product-image-${currentIndex + 1}`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Top-right fixed toolbar */}
      <div className="fixed top-4 right-4 flex flex-col space-y-2 z-50">
        <button onClick={onClose} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaTimes />
        </button>
        <button onClick={handleDownload} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaDownload />
        </button>
        <button onClick={handlePrev} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaArrowLeft />
        </button>
        <button onClick={handleNext} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaArrowRight />
        </button>
        <button onClick={() => setZoom((z) => Math.min(z + 0.2, 3))} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaSearchPlus />
        </button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))} className="text-white text-xl p-2 hover:bg-gray-700 rounded">
          <FaSearchMinus />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center max-w-[90%] max-h-[90%]">
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex}`}
          className="object-contain max-w-full max-h-[80vh]"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default ImageGalleryModal;
