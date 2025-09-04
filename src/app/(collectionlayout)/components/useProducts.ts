// hooks/useProducts.ts
"use client";
import { useMemo } from "react";
import { collections, products, productss } from "@/utils/constants/constant";
import { Product } from "@/types/product";

const allProducts: Product[] = [...products, ...productss];

export function normalize(s: string) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
type Filters = {
  inStock?: boolean;
  notAvailable?: boolean;
  categories?: string[];
  composition?: string[];
  property?: string[];
  brand?: string[];
  paperType?: string[];
};

export function useCollectionProducts(
  param: string,
  filters: Filters | null,
  priceRange: [number, number],
  sortBy: string
) {
  // Find collection
  const collection = useMemo(
    () =>
      collections.find((c) => {
        const idNormalized = normalize(String(c.id));
        const titleNormalized = normalize(String(c.title));
        return idNormalized === param || titleNormalized === param;
      }),
    [param]
  );

  // Base products
  const baseProducts = useMemo(() => {
    if (param === "all" || !param) return allProducts;
    if (collection) {
      const idNorm = normalize(String(collection.id));
      const titleNorm = normalize(String(collection.title));
      return allProducts.filter((p) => {
        const cat = normalize(String(p.category ?? ""));
        return cat === idNorm || cat === titleNorm;
      });
    }
    const filtered = allProducts.filter(
      (p) => normalize(String(p.category ?? "")) === param
    );
    return filtered.length > 0 ? filtered : allProducts;
  }, [param, collection]);

  // Apply filters
  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      const cat = normalize(String(p.category ?? ""));
      const comp = normalize(String(p.composition ?? ""));
      const brand = normalize(String(p.brand ?? ""));
      const paper = normalize(String(p.paperType ?? ""));
      const props = (p.properties ?? []).map((pr) => normalize(String(pr)));

      if (filters?.inStock && !p.available) return false;
      if (filters?.notAvailable && p.available) return false;

      const price =
        parseFloat(String(p.newPrice).replace(/[^0-9.-]+/g, "")) || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      if (
        filters?.categories?.length &&
        !filters.categories.map(normalize).includes(cat)
      )
        return false;
      if (
        filters?.composition?.length &&
        !filters.composition.map(normalize).includes(comp)
      )
        return false;
      if (
        filters?.brand?.length &&
        !filters.brand.map(normalize).includes(brand)
      )
        return false;
      if (
        filters?.paperType?.length &&
        !filters.paperType.map(normalize).includes(paper)
      )
        return false;
      const propertyFilter = filters?.property?.map(normalize) ?? [];
      if (
        propertyFilter.length &&
        !props.some((pr) => propertyFilter.includes(pr))
      )
        return false;

      return true;
    });
  }, [baseProducts, filters, priceRange]);

  // Sort
  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case "price_low_high":
        return copy.sort(
          (a, b) =>
            parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, "")) -
            parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, ""))
        );
      case "price_high_low":
        return copy.sort(
          (a, b) =>
            parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, "")) -
            parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, ""))
        );
      case "name_az":
        return copy.sort((a, b) =>
          String(a.name).localeCompare(String(b.name))
        );
      case "name_za":
        return copy.sort((a, b) =>
          String(b.name).localeCompare(String(a.name))
        );
      default:
        return copy;
    }
  }, [filtered, sortBy]);

  return { collection, baseProducts, filtered, sorted };
}
