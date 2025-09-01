"use client";
import React from "react";
import Image from "next/image";
import { FiList, FiGrid } from "react-icons/fi";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { ProductCardItem } from "@/components/common/Card";

interface ProductViewProps {
  collectionTitle?: string;
  collectionImg?: string;
  rawParam: string;
  productCount: number;
  sorted: Product[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  gridCols: number;
  setGridCols: (cols: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const ProductListSection: React.FC<ProductViewProps> = ({
  collectionTitle,
  collectionImg,
  rawParam,
  productCount,
  sorted,
  viewMode,
  setViewMode,
  gridCols,
  setGridCols,
  sortBy,
  setSortBy,
}) => {
  const router = useRouter();

  const gridClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <div className="container flex flex-col px-12">
      {/* Collection header */}
      <div className="flex flex-col w-full mx-auto py-16">
        <h1 className="text-base md:text-xl font-bold mb-4">
          {collectionTitle ?? rawParam}
        </h1>
        {collectionImg && (
          <Image
            src={collectionImg}
            alt={collectionTitle ?? rawParam}
            width={250}
            height={250}
            className="object-cover"
          />
        )}
        <span className="text-gray-500 py-4">
          Details matter! Liven up your interior with our selection of home
          accessories.
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex-1 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2 text-sm cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="price_low_high">Price, low to high</option>
              <option value="price_high_low">Price, high to low</option>
              <option value="name_az">Name, A to Z</option>
              <option value="name_za">Name, Z to A</option>
            </select>
          </div>
        </div>

        {/* Product list */}
        <div id="product-list">
          {viewMode === "list" ? (
            <div className="space-y-6">
              {sorted.map((p: Product) => (
                <div
                  key={p.id}
                  className="flex gap-6 items-start border-b pb-6"
                >
                  <div className="w-64 h-74 bg-gray-100 flex-shrink-0">
                    <Image
                      src={String(p.img ?? "")}
                      alt={String(p.name ?? "")}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                    <p className="text-gray-600 mb-4">{p.dicription}</p>
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400 line-through">
                        {p.oldPrice}
                      </div>
                      <div className="text-[#a67c00] font-bold text-lg">
                        {p.newPrice}
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        className="px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-[#a67c00] transition"
                        onClick={() => router.push(`/card/${p.id}`)}
                      >
                        View product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${gridClass} gap-8`}
            >
              {sorted.map((p: Product, idx: number) => (
                <div
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/card/${p.id}`)}
                >
                  <ProductCardItem
                    product={p}
                    isMobile={false}
                    hovered={null}
                    setHovered={() => {}}
                    index={idx}
                    gridCols={gridCols}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-4 text-sm text-gray-600 mb-20">
          Showing 1-{productCount} of {productCount} item(s)
        </div>
      </div>
    </div>
  );
};

export default ProductListSection;
