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

  const gridClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridClass} gap-8`}>
        {products.map((p, idx) => (
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
    </div>
  );
}
