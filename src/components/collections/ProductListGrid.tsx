import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductCardItem } from "@/components/common/Card";
import { useRouter } from "next/navigation";

export default function ProductListGrid({
  products,
  gridCols,
}: {
  products: Product[];
  gridCols: number;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const mobilePageSize = 2; // products per page on mobile

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine products to display
  const displayedProducts = isMobile
    ? products.slice((currentPage - 1) * mobilePageSize, currentPage * mobilePageSize)
    : products;

  const totalPages = isMobile ? Math.ceil(products.length / mobilePageSize) : 1;

  const gridClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridClass} gap-8`}>
        {displayedProducts.map((p, idx) => (
          <div
            key={p.id}
            className="cursor-pointer"
            onClick={() => router.push(`/card/${p.id}`)}
          >
            <ProductCardItem
              product={p}
              isMobile={isMobile} // <-- pass mobile flag here
              hovered={null}
              setHovered={() => {}}
              index={idx}
              gridCols={gridCols}
            />
          </div>
        ))}
      </div>

      {/* Pagination for mobile */}
      {isMobile && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6 md:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
