"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { collections, products, productss } from "@/utils/constants/constant";
import PriceRangeFilter from "./PriceRangeFilter";

interface NavbarProps {
  id: string;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

/** Product type used in Navbar (adjust if constants differ) */
type Product = {
  id: number | string;
  available?: boolean;
  category?: string | null;
  composition?: string | null;
  properties?: string[] | null;
  brand?: string | null;
  paperType?: string | null;
  // other fields possible
  [key: string]: unknown;
};

const allProducts: Product[] = [
  ...(products as Product[]),
  ...(productss as Product[]),
];

const defaultFilters = {
  availability: { inStock: false, notAvailable: false },
  categories: [] as string[],
  composition: [] as string[],
  property: [] as string[],
  brand: [] as string[],
  paperType: [] as string[],
};

const Navbar = ({ id, priceRange, setPriceRange }: NavbarProps) => {
  const router = useRouter();
  const collection = collections.find((c) => String(c.id) === id);

  const collectionProducts = useMemo(() => {
    if (!collection?.title) return allProducts;
    const matched = allProducts.filter((p) => p.category === collection.title);
    return matched.length ? matched : allProducts;
  }, [collection]);

  const [filters, setFilters] = useState({
    ...defaultFilters,
  });

  const toggleArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const ensureAvailabilityAfterInteraction = (prev: typeof filters) => {
    if (prev.availability.inStock && prev.availability.notAvailable) {
      return { inStock: true, notAvailable: false };
    }
    return prev.availability;
  };

  const handleToggleArray = (
    group: "categories" | "composition" | "property" | "brand" | "paperType",
    value: string
  ) => {
    setFilters((prev) => {
      const newGroup = toggleArray(prev[group], value);
      return {
        ...prev,
        [group]: newGroup,
        availability: ensureAvailabilityAfterInteraction(prev),
      };
    });
  };

  const toggleAvailability = (key: "inStock" | "notAvailable") =>
    setFilters((s) => (({
      ...s,
      availability: { ...s.availability, [key]: !s.availability[key] },
    } as typeof filters)));

  // safer unique collector without any
  const unique = <K extends keyof Product>(key: K) => {
    const set = new Set<string>();
    collectionProducts.forEach((p) => {
      const v = p[key];
      if (Array.isArray(v)) {
        (v as (string | number)[]).forEach((x) => set.add(String(x)));
      } else if (v !== undefined && v !== null) {
        set.add(String(v));
      }
    });
    return Array.from(set).sort();
  };

  const allCategories = useMemo(() => unique("category"), [collectionProducts]);
  const allCompositions = useMemo(() => unique("composition"), [collectionProducts]);
  const allProperties = useMemo(() => unique("properties"), [collectionProducts]);
  const allBrands = useMemo(() => unique("brand"), [collectionProducts]);
  const allPaperTypes = useMemo(() => unique("paperType"), [collectionProducts]);

  // counts with explicit typing
  const counts = useMemo(() => {
    const c: {
      availability: { inStock: number; notAvailable: number };
      categories: Record<string, number>;
      composition: Record<string, number>;
      property: Record<string, number>;
      brand: Record<string, number>;
      paperType: Record<string, number>;
    } = {
      availability: { inStock: 0, notAvailable: 0 },
      categories: {},
      composition: {},
      property: {},
      brand: {},
      paperType: {},
    };

    collectionProducts.forEach((p) => {
      if (p.available) c.availability.inStock++;
      else c.availability.notAvailable++;

      if (p.category) c.categories[String(p.category)] = (c.categories[String(p.category)] || 0) + 1;
      if (p.composition) c.composition[String(p.composition)] = (c.composition[String(p.composition)] || 0) + 1;
      if (p.brand) c.brand[String(p.brand)] = (c.brand[String(p.brand)] || 0) + 1;
      if (p.paperType) c.paperType[String(p.paperType)] = (c.paperType[String(p.paperType)] || 0) + 1;

      (p.properties ?? []).forEach((prop) => {
        c.property[String(prop)] = (c.property[String(prop)] || 0) + 1;
      });
    });

    return c;
  }, [collectionProducts]);

  const filteredProducts = useMemo(() => {
    return collectionProducts.filter((p) => {
      if (!filters.availability.inStock && p.available) return false;
      if (!filters.availability.notAvailable && !p.available) return false;

      if (filters.categories.length && (!p.category || !filters.categories.includes(String(p.category)))) return false;
      if (filters.composition.length && (!p.composition || !filters.composition.includes(String(p.composition)))) return false;

      if (filters.property.length) {
        const hasAny = (p.properties ?? []).some((pp) => filters.property.includes(String(pp)));
        if (!hasAny) return false;
      }

      if (filters.brand.length && (!p.brand || !filters.brand.includes(String(p.brand)))) return false;
      if (filters.paperType.length && (!p.paperType || !filters.paperType.includes(String(p.paperType)))) return false;

      return true;
    });
  }, [filters, collectionProducts]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (!filters.availability.inStock || !filters.availability.notAvailable) {
      params.set("inStock", String(filters.availability.inStock));
      params.set("notAvailable", String(filters.availability.notAvailable));
    }
    if (filters.categories.length) params.set("categories", filters.categories.join(","));
    if (filters.composition.length) params.set("composition", filters.composition.join(","));
    if (filters.property.length) params.set("property", filters.property.join(","));
    if (filters.brand.length) params.set("brand", filters.brand.join(","));
    if (filters.paperType.length) params.set("paperType", filters.paperType.join(","));

    const base = typeof window !== "undefined" ? window.location.pathname : "/";
    const qs = params.toString();
    const url = qs ? `${base}?${qs}` : base;

    router.replace(url, { scroll: false });
  }, [filters, router]);

  const clearAll = () => setFilters({ ...defaultFilters });

  return (
    <div className="w-full max-w-[27%] mx-auto p-4 md:p-8">
      <div className="text-base mb-6 md:text-lg font-bold py-8 border-b ">
        {collection?.title ?? "No Title Found"}
      </div>

      <section className="md:col-span-3 space-y-8 w-full ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Filter By</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="text-sm underline text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Clear All
            </button>
            <span className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {collectionProducts.length}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-medium py-3">Availability</h3>
          <ul className="grid grid-cols-2 gap-2">
            <FilterButton
              label="In stock"
              count={counts.availability.inStock}
              active={filters.availability.inStock}
              onClick={() => toggleAvailability("inStock")}
            />
            <FilterButton
              label="Not available"
              count={counts.availability.notAvailable}
              active={filters.availability.notAvailable}
              onClick={() => toggleAvailability("notAvailable")}
            />
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <ul className="grid grid-cols-2 gap-2">
            {allCategories.map((f) => (
              <FilterButton
                key={f}
                label={f}
                count={counts.categories[f] || 0}
                active={filters.categories.includes(f)}
                onClick={() => handleToggleArray("categories", f)}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Composition</h3>
          <ul className="grid grid-cols-2 gap-2">
            {allCompositions.map((f) => (
              <FilterButton
                key={f}
                label={f}
                count={counts.composition[f] || 0}
                active={filters.composition.includes(f)}
                onClick={() => handleToggleArray("composition", f)}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Price</h3>
          <div className="px-2">
            <PriceRangeFilter range={priceRange} setRange={setPriceRange} />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Property</h3>
          <ul className="grid grid-cols-2 gap-2">
            {Object.keys(counts.property).map((f) => (
              <FilterButton
                key={f}
                label={f}
                count={counts.property[f] || 0}
                active={filters.property.includes(f)}
                onClick={() => handleToggleArray("property", f)}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Brand</h3>
          <ul className="grid grid-cols-2 gap-2">
            {allBrands.map((f) => (
              <FilterButton
                key={f}
                label={f}
                count={counts.brand[f] || 0}
                active={filters.brand.includes(f)}
                onClick={() => handleToggleArray("brand", f)}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Paper Type</h3>
          <ul className="grid grid-cols-2 gap-2">
            {allPaperTypes.map((f) => (
              <FilterButton
                key={f}
                label={f}
                count={counts.paperType[f] || 0}
                active={filters.paperType.includes(f)}
                onClick={() => handleToggleArray("paperType", f)}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;

const FilterButton = ({
  label,
  count,
  onClick,
  active = false,
}: {
  label: string;
  count: number;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
      className={`flex justify-between items-center px-3 py-2 border text-sm cursor-pointer transition
        ${
          active
            ? "bg-[#ba933e] text-white border-[#ba933e]"
            : "hover:bg-[#f8f5f1]"
        }`}
    >
      <span>{label}</span>
      <span className="text-gray-500">({count})</span>
    </li>
  );
};
