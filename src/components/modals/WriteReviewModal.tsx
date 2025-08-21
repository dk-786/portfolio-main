"use client";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: number;
    img: string;
    name: string;
  };
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ open, onClose, product }) => {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder submit behavior
    // In a real app, send to API then close
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-4xl mx-4 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-center text-2xl font-bold">Write a review</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: product photo and name */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-full max-w-sm overflow-hidden rounded">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-auto object-cover shadow"
                />
              </div>
              <div className="mt-2 w-96 text-center flex justify-center font-bold md:text-left">
                <p className="text-sm text-gray-700">{product.name}</p>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quality + Stars in one line */}
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-800">Quality</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className="cursor-pointer"
                      aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    >
                      <AiFillStar
                        className={`w-6 h-6 ${rating >= n ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Summary of your review"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block mb-1 font-medium">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded px-3 py-2 min-h-[120px]"
                  placeholder="Share your experience with this product"
                  required
                />
              </div>

              {/* Your Name */}
              <div>
                <label className="block mb-1 font-medium">Your name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-black text-white hover:bg-black/80 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;


