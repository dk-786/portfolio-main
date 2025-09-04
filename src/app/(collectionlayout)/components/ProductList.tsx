"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { ProductCardItem } from "@/components/common/Card";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context/AppContext";

type Props = {
  products: Product[];
  viewMode: "grid" | "list";
  gridCols: number;
  currentPage: number;
  productsPerPage: number;
  router: ReturnType<typeof useRouter>;
};

const ProductList: React.FC<Props> = ({
  products,
  viewMode,
  gridCols,
  currentPage,
  productsPerPage,
  router,
}) => {
  const paginated = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const { getConvertedPrice } = useAppContext();
  const gridClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  if (viewMode === "list") {
    return (
      <div className="space-y-6 ">
        {paginated.map((p) => (
          <div key={p.id} className="flex gap-6 items-start border-b pb-6">
            <div className="w-64 h-74 bg-gray-100 flex-shrink-0">
              <Image
                src={String(p.img)}
                alt={String(p.name)}
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
                  {p.oldPrice ? getConvertedPrice(Number(p.oldPrice)) : null}
                </div>
                <div className="text-[#a67c00] font-bold text-lg">
                  {getConvertedPrice(Number(p.newPrice))}
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-black text-white rounded hover:bg-[#a67c00] transition"
                  onClick={() => router.push(`/card/${p.id}`)}
                >
                  View product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridClass} gap-8 mb-12 `}>
      {paginated.map((p, idx) => (
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
  );
};

export default ProductList;
