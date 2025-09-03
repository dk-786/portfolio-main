"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import { collections, products, productss } from "@/utils/constants/constant";
import { Product } from "@/types/product";

import CollectionHeader from "@/components/collections/CollectionHeader";
import ViewControls from "@/components/collections/ViewControls";
import ProductListItem from "@/components/collections/ProductListItem";
import ProductListGrid from "@/components/collections/ProductListGrid";
import Loader from "@/components/collections/Loader";
import { TurningTableCard } from "@/components/sidebar";

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
  const rawParam = String(params?.id ?? "");
  const decoded = decodeURIComponent(rawParam);
  const param = normalize(decoded);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([...priceRange]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [loading, setLoading] = useState(false);
const openFilterModal = () => {
  setTempPriceRange([...priceRange]);
  setFilterOpen(true);
};
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [priceRange]);

  const collection = useMemo(() => {
    return collections.find((c) => {
      const idNorm = normalize(String(c.id));
      const titleNorm = normalize(String(c.title));
      return idNorm === param || titleNorm === param;
    });
  }, [param]);

  const baseProducts = useMemo(() => {
    if (collection) {
      const idNorm = normalize(String(collection.id));
      const titleNorm = normalize(String(collection.title));
      return allProducts.filter((p) => {
        const cat = normalize(String(p.category ?? ""));
        return cat === idNorm || cat === titleNorm;
      });
    }
    return allProducts.filter(
      (p) => normalize(String(p.category ?? "")) === param
    );
  }, [collection]);

  function parseListParam(value: string | null) {
    if (!value) return [];
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const filters = useMemo(
    () => ({
      inStock: searchParams.get("inStock") === "true" || false,
      notAvailable: searchParams.get("notAvailable") === "true" || false,
      categories: parseListParam(searchParams.get("categories")),
      composition: parseListParam(searchParams.get("composition")),
      property: parseListParam(searchParams.get("property")),
      brand: parseListParam(searchParams.get("brand")),
      paperType: parseListParam(searchParams.get("paperType")),
    }),
    [searchParams]
  );

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      if (filters.inStock && !p.available) return false;
      if (filters.notAvailable && p.available) return false;
      if (
        filters.categories.length &&
        !filters.categories.includes(p.category ?? "")
      )
        return false;
      if (
        filters.composition.length &&
        !filters.composition.includes(p.composition ?? "")
      )
        return false;
      if (
        filters.property.length &&
        !(p.properties ?? []).some((pp) => filters.property.includes(pp))
      )
        return false;
      if (filters.brand.length && !filters.brand.includes(p.brand ?? ""))
        return false;
      if (
        filters.paperType.length &&
        !filters.paperType.includes(p.paperType ?? "")
      )
        return false;

      const rawPrice = String(p.newPrice ?? "");
      const price = parseFloat(rawPrice.replace(/[^0-9.-]+/g, "")) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [baseProducts, filters, priceRange]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case "price_low_high":
        copy.sort(
          (a, b) =>
            (parseFloat(String(a.newPrice)) || 0) -
            (parseFloat(String(b.newPrice)) || 0)
        );
        break;
      case "price_high_low":
        copy.sort(
          (a, b) =>
            (parseFloat(String(b.newPrice)) || 0) -
            (parseFloat(String(a.newPrice)) || 0)
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
    }
    return copy;
  }, [filtered, sortBy]);

  const productCount = sorted.length;

  return (
    <>
      {/* 🚀 Desktop View (unchanged) */}
        
      <div className="hidden lg:flex w-full">
        <Navbar
          id={rawParam}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {loading && <Loader />}

        <div className="container flex flex-col px-12">
          <CollectionHeader collection={collection} rawParam={rawParam} />
          <div className="flex-1 container mx-auto">
            <ViewControls
              viewMode={viewMode}
              gridCols={gridCols}
              setViewMode={setViewMode}
              setGridCols={setGridCols}
              sortBy={sortBy}
              setSortBy={setSortBy}
              productCount={productCount}
            />

            <div id="product-list">
              {viewMode === "list" ? (
                <div className="space-y-6">
                  {sorted.map((p) => (
                    <ProductListItem key={p.id} p={p} />
                  ))}
                </div>
              ) : (
                <ProductListGrid products={sorted} gridCols={gridCols} />
              )}
            </div>

            <div className="mt-6 border-t pt-4 text-sm text-gray-600 mb-20">
              Showing 1-{productCount} of {productCount} item(s)
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col w-full px-6 lg:hidden mb-20">
        <TurningTableCard />
        <CollectionHeader collection={collection} rawParam={rawParam} />

        <div className="flex w-full items-center justify-between gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-200 rounded-sm w-full h-14"
          >
            <option value="relevance">Relevance</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
            <option value="name_az">Name: A-Z</option>
            <option value="name_za">Name: Z-A</option>
          </select>
          <button
           onClick={openFilterModal}
            className="w-full h-14 rounded-sm font-lg text-white bg-black"
          >
            Filter
          </button>
        </div>

        <div className="mb-10 border-b py-8 w-full text-gray-600">
          Showing 1-{productCount} of {productCount} item(s)
        </div>

        <div id="product-list">
          <ProductListGrid products={sorted} gridCols={2} />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => {
                setPriceRange(tempPriceRange); // Apply filters
                setFilterOpen(false);
              }}
              className="text-white bg-black px-4 py-2 rounded"
            >
              OK
            </button>
          </div>

          {/* Pass tempPriceRange and setter to Navbar */}
          <Navbar
            id={rawParam}
            priceRange={tempPriceRange}
            setPriceRange={setTempPriceRange}
          />
        </div>
      )}
    </>
  );
}
