"use client";
import React from "react";
import { sizeGuide } from "@/utils/constants/constant";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-center text-2xl font-bold">Size Guide</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {sizeGuide.headers.map((head) => (
                  <th key={head} className="border border-gray-200 px-3 py-2 text-left bg-gray-50">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeGuide.rows.map((row, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="border border-gray-200 px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;


