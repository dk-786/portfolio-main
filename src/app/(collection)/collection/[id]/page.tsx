"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import { ProductCardItem } from "@/components/common/Card";
import { collections, products, productss } from "@/utils/constants/constant";
import Image from "next/image";
import { FiList, FiGrid } from "react-icons/fi";
import { Product } from "@/types/product";

/** combined products */
const allProducts: Product[] = [
  ...(products as Product[]),
  ...(productss as Product[]),
];

function normalize(s: string) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function CollectionViewClient() {
  const params = useParams();

  const rawParam = String(params?.id ?? ""); // e.g. "Lighting%20Lamp" or "lighting-lamp" or "6"
  const decoded = (() => {
    try {
      return decodeURIComponent(rawParam);
    } catch {
      return rawParam;
    }
  })();
  const param = normalize(decoded);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [priceRange]);

  // find collection by id OR title (normalized)
  const collection = useMemo(() => {
    return collections.find((c) => {
      const idNormalized = normalize(String(c.id));
      const titleNormalized = normalize(String(c.title));
      return idNormalized === param || titleNormalized === param;
    });
  }, [param]);

  // if collection not found, products might still match by category === id (legacy)
  const baseProducts = useMemo(() => {
    if (collection) {
      // match product.category to collection.id OR collection.title (normalized)
      const idNorm = normalize(String(collection.id));
      const titleNorm = normalize(String(collection.title));
      return allProducts.filter((p) => {
        const cat = normalize(String(p.category ?? ""));
        return cat === idNorm || cat === titleNorm;
      });
    }
    // fallback: treat param as a category slug
    return allProducts.filter(
      (p) => normalize(String(p.category ?? "")) === param
    );
  }, [collection]);

  // parse filters from search params (kept same as your logic)
  function parseListParam(value: string | null) {
    if (!value) return [];
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const filters = useMemo(() => {
    return {
      inStock: searchParams.get("inStock") === "true" || false,
      notAvailable: searchParams.get("notAvailable") === "true" || false,
      categories: parseListParam(searchParams.get("categories")),
      composition: parseListParam(searchParams.get("composition")),
      property: parseListParam(searchParams.get("property")),
      brand: parseListParam(searchParams.get("brand")),
      paperType: parseListParam(searchParams.get("paperType")),
    };
  }, [searchParams]);

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      if (
        filters.inStock === true &&
        filters.notAvailable === false &&
        !p.available
      )
        return false;
      if (
        filters.inStock === false &&
        filters.notAvailable === true &&
        p.available
      )
        return false;
      if (
        filters.categories.length &&
        (!p.category || !filters.categories.includes(p.category))
      )
        return false;
      if (
        filters.composition.length &&
        (!p.composition || !filters.composition.includes(p.composition))
      )
        return false;
      if (filters.property.length) {
        const hasAny = (p.properties ?? []).some((pp) =>
          filters.property.includes(pp)
        );
        if (!hasAny) return false;
      }
      if (
        filters.brand.length &&
        (!p.brand || !filters.brand.includes(p.brand))
      )
        return false;
      if (
        filters.paperType.length &&
        (!p.paperType || !filters.paperType.includes(p.paperType))
      )
        return false;

      const rawPrice = String(p.newPrice ?? "");
      const price = parseFloat(rawPrice.replace(/[^0-9.-]+/g, "")) || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      return true;
    });
  }, [baseProducts, filters, priceRange]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case "price_low_high":
        copy.sort(
          (a, b) =>
            (parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, "")) || 0) -
            (parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, "")) || 0)
        );
        break;
      case "price_high_low":
        copy.sort(
          (a, b) =>
            (parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, "")) || 0) -
            (parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, "")) || 0)
        );
        break;
      case "name_az":
        copy.sort((a, b) =>
          String(a.name ?? "").localeCompare(String(b.name ?? ""))
        );
        break;
      case "name_za":
        copy.sort((a, b) =>
          String(b.name ?? "").localeCompare(String(a.name ?? ""))
        );
        break;
      default:
        break;
    }
    return copy;
  }, [filtered, sortBy]);

  const productCount = sorted.length;
  const gridClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <div className="w-full flex">
      <Navbar
        id={rawParam}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="container flex flex-col px-12">
        <div className="flex flex-col w-full mx-auto py-16">
          <h1 className="text-base md:text-xl font-bold mb-4">
            {collection?.title ?? rawParam}
          </h1>
          {collection?.img && (
            <Image
              src={collection.img}
              alt={collection.title}
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

          <div className="mt-6 border-t pt-4 text-sm text-gray-600 mb-20">
            Showing 1-{productCount} of {productCount} item(s)
          </div>
        </div>
      </div>
    </div>
  );
}
