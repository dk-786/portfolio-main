"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { collections, products, productss } from "@/utils/constants/constant";
import PriceRangeFilter from "./PriceRangeFilter";
import FilterSection from "./FilterSection";
import { useFilters } from "./useFilters";
import { TurningTableCard } from "@/components/sidebar";

interface NavbarProps {
  id: string;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  variant?: "default" | "sidebar"; // 👈 new
}

const Navbar = ({ id, priceRange, setPriceRange, variant = "default" }: NavbarProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const collection = collections.find((c) => String(c.id) === id);
  const allProducts = useMemo(() => [...products, ...productss], []);

  const collectionProducts = useMemo(() => {
    if (!collection?.title) return allProducts;
    const matched = allProducts.filter((p) => p.category === collection.title);
    return matched.length ? matched : allProducts;
  }, [collection, allProducts]);

  const {
    filters,
    counts,
    filteredProducts,
    allCategories,
    allCompositions,
    allProperties,
    allBrands,
    allPaperTypes,
    handleToggleArray,
    toggleAvailability,
    clearAll,
  } = useFilters(collectionProducts);

  useEffect(() => setMounted(true), []);

  // Sync filters with URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) =>
          params.set(k, String(v))
        );
      }
    });
    const base = window.location.pathname;
    const qs = params.toString();
    router.replace(qs ? `${base}?${qs}` : base, { scroll: false });
  }, [filters, router]);

  return (
    <div
      className={`${
        variant === "sidebar"
          ? "w-full h-full overflow-y-auto p-6" 
          : "w-full md:max-w-[27%] mx-auto p-6 md:p-8" 
      }`}
    >
      {variant === "default" && (
        <div className="text-base mb-6 md:text-lg font-bold py-8 border-b hidden md:block">
          {collection?.title ?? "Home"}
        </div>
      )}

      <section className="md:col-span-3 space-y-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filter By</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="text-sm underline text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Clear All
            </button>
            {mounted && (
              <span className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {collectionProducts.length}
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        <FilterSection
          title="Availability"
          options={[
            {
              key: "inStock",
              label: "In Stock",
              count: counts.availability.inStock,
              active: filters.availability.inStock,
              onClick: () => toggleAvailability("inStock"),
            },
            {
              key: "notAvailable",
              label: "Not Available",
              count: counts.availability.notAvailable,
              active: filters.availability.notAvailable,
              onClick: () => toggleAvailability("notAvailable"),
            },
          ]}
        />

        {/* Categories */}
        <FilterSection
          title="Categories"
          options={allCategories.map((f) => ({
            key: f,
            label: f,
            count: counts.categories[f] || 0,
            active: filters.categories.includes(f),
            onClick: () => handleToggleArray("categories", f),
          }))}
        />

        {/* Composition */}
        <FilterSection
          title="Composition"
          options={allCompositions.map((f) => ({
            key: f,
            label: f,
            count: counts.composition[f] || 0,
            active: filters.composition.includes(f),
            onClick: () => handleToggleArray("composition", f),
          }))}
        />

        {/* Price */}
        <div>
          <h3 className="font-medium mb-3">Price</h3>
          <div className="px-2">
            <PriceRangeFilter range={priceRange} setRange={setPriceRange} />
          </div>
        </div>

        {/* Property */}
        <FilterSection
          title="Property"
          options={allProperties.map((f) => ({
            key: f,
            label: f,
            count: counts.property[f] || 0,
            active: filters.property.includes(f),
            onClick: () => handleToggleArray("property", f),
          }))}
        />

        {/* Brand */}
        <FilterSection
          title="Brand"
          options={allBrands.map((f) => ({
            key: f,
            label: f,
            count: counts.brand[f] || 0,
            active: filters.brand.includes(f),
            onClick: () => handleToggleArray("brand", f),
          }))}
        />

        {/* Paper Type */}
        <FilterSection
          title="Paper Type"
          options={allPaperTypes.map((f) => ({
            key: f,
            label: f,
            count: counts.paperType[f] || 0,
            active: filters.paperType.includes(f),
            onClick: () => handleToggleArray("paperType", f),
          }))}
        />
      </section>

      <TurningTableCard />
    </div>
  );
};

export default Navbar;
