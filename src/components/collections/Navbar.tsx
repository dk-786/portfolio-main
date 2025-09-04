// Navbar.tsx
"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { collections, products, productss } from "@/utils/constants/constant";
import PriceRangeFilter from "./PriceRangeFilter";
import FilterSection from "./FilterSection";
import { useFilters } from "./useFilters";
import { TurningTableCard } from "@/components/sidebar";

interface Filters {
  availability: {
    inStock: boolean;
    notAvailable: boolean;
  };
  categories: string[];
  composition: string[];
  property: string[];
  brand: string[];
  paperType: string[];
}

interface NavbarProps {
  id: string;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  variant?: "default" | "sidebar" | "grouped";
  onFiltersChange?: (filters: Filters) => void;
}


const Navbar = ({
  id,
  priceRange,
  setPriceRange,
  variant = "default",
  onFiltersChange,
}: NavbarProps) => {
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
    allCategories,
    allCompositions,
    allProperties,
    allBrands,
    allPaperTypes,
    handleToggleArray,
    toggleAvailability,
    clearAll,
  } = useFilters(collectionProducts);

  // ✅ Send filters back to PageContent
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  // Sync filters with URL (optional, for deep links)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => params.set(k, String(v)));
      }
    });
    const base = window.location.pathname;
    const qs = params.toString();
    router.replace(qs ? `${base}?${qs}` : base, { scroll: false });
  }, [filters, router]);

  return (
    <div
      className={`${
        variant === "sidebar" || variant === "grouped"
          ? "w-full h-full overflow-y-auto p-6"
          : "w-full md:max-w-[27%] mx-auto p-6 md:p-8"
      }`}
    >
      {variant === "default" && (
        <div className="text-base mb-6 md:text-lg font-bold py-8 border-b hidden md:block">
          {collection?.title ?? "Home"}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter By</h2>
        <button
          onClick={clearAll}
          className="text-sm underline text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <section
        className={`w-full space-y-8 ${
          variant === "grouped"
            ? "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            : "space-y-8"
        }`}
      >
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>
        {/* Price slider can stay full width */}
        <div className="col-span-full">
          <h3 className="font-medium mb-3">Price</h3>
          <div className="px-2">
            <PriceRangeFilter range={priceRange} setRange={setPriceRange} />
          </div>
        </div>

        {/* Second row */}
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        
      </section>

      {variant === "default" && <TurningTableCard />}
    </div>
  );
};

export default Navbar;
