"use client";
import React from "react";
import { FiList, FiGrid } from "react-icons/fi";

type Props = {
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  gridCols: number;
  productCount: number;
  setGridCols: (c: number) => void;
};

const ViewModeToggle: React.FC<Props> = ({
  viewMode,
  setViewMode,
  gridCols,
  productCount,
  setGridCols,
}) => {
  return (
    <>
      <div className="text-sm text-gray-600">
        There {productCount === 1 ? "is" : "are"} {productCount} product
        {productCount === 1 ? "" : "s"}.
      </div>

      <div className="flex items-center gap-2 border rounded px-2 py-1">
        <button
          onClick={() => {
            setViewMode("list");
            setGridCols(1);
          }}
          title="List view"
          className={`p-1 cursor-pointer ${
            viewMode === "list" ? "bg-gray-200" : ""
          }`}
        >
          <FiList />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          title="Grid view"
          className={`p-1 cursor-pointer ${
            viewMode === "grid" ? "bg-gray-200" : ""
          }`}
        >
          <FiGrid />
        </button>

        {viewMode === "grid" && (
          <div className="flex items-center ml-2 gap-1">
            {[2, 3, 4].map((c) => (
              <button
                key={c}
                onClick={() => setGridCols(c)}
                className={`w-6 h-6 border rounded text-xs cursor-pointer ${
                  gridCols === c ? "bg-gray-200" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewModeToggle;
