import { useMemo, useState } from "react";

interface Product {
  available: boolean;
  category: string;
  composition: string;
  properties: string[];
  brand: string;
  paperType: string;
  // Add other properties that may exist on a product
}

// Moved outside the hook to avoid recreating on every render
const getUnique = <T, K extends keyof T>(products: T[], key: K): string[] => {
  const set = new Set<string>();
  products.forEach((p) => {
    const v = p[key];
    if (Array.isArray(v)) {
      v.forEach((x: unknown) => set.add(String(x)));
    } else if (v !== undefined && v !== null) {
      set.add(String(v));
    }
  });
  return Array.from(set).sort();
};

export const useFilters = (collectionProducts: Product[]) => {
  const defaultFilters = {
    availability: { inStock: false, notAvailable: false },
    categories: [] as string[],
    composition: [] as string[],
    property: [] as string[],
    brand: [] as string[],
    paperType: [] as string[],
  };

  const [filters, setFilters] = useState(defaultFilters);

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
    setFilters((prev) => ({
      ...prev,
      [group]: toggleArray(prev[group], value),
      availability: ensureAvailabilityAfterInteraction(prev),
    }));
  };

  const toggleAvailability = (key: "inStock" | "notAvailable") =>
    setFilters((s) => ({
      ...s,
      availability: { ...s.availability, [key]: !s.availability[key] },
    }));

  const allCategories = useMemo(() => getUnique(collectionProducts, "category"), [collectionProducts]);
  const allCompositions = useMemo(() => getUnique(collectionProducts, "composition"), [collectionProducts]);
  const allProperties = useMemo(() => getUnique(collectionProducts, "properties"), [collectionProducts]);
  const allBrands = useMemo(() => getUnique(collectionProducts, "brand"), [collectionProducts]);
  const allPaperTypes = useMemo(() => getUnique(collectionProducts, "paperType"), [collectionProducts]);

  const counts = useMemo(() => {
    const c = {
      availability: { inStock: 0, notAvailable: 0 },
      categories: {} as Record<string, number>,
      composition: {} as Record<string, number>,
      property: {} as Record<string, number>,
      brand: {} as Record<string, number>,
      paperType: {} as Record<string, number>,
    };

    collectionProducts.forEach((p) => {
      if (p.available) c.availability.inStock++;
      else c.availability.notAvailable++;

      if (p.category) c.categories[p.category] = (c.categories[p.category] || 0) + 1;
      if (p.composition) c.composition[p.composition] = (c.composition[p.composition] || 0) + 1;
      if (p.brand) c.brand[p.brand] = (c.brand[p.brand] || 0) + 1;
      if (p.paperType) c.paperType[p.paperType] = (c.paperType[p.paperType] || 0) + 1;

      (p.properties ?? []).forEach((prop: string) => {
        c.property[prop] = (c.property[prop] || 0) + 1;
      });
    });

    return c;
  }, [collectionProducts]);

  const filteredProducts = useMemo(() => {
    return collectionProducts.filter((p) => {
      if (!filters.availability.inStock && p.available) return false;
      if (!filters.availability.notAvailable && !p.available) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.composition.length && !filters.composition.includes(p.composition)) return false;
      if (filters.property.length && !(p.properties ?? []).some((pp: string) => filters.property.includes(pp))) return false;
      if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
      if (filters.paperType.length && !filters.paperType.includes(p.paperType)) return false;
      return true;
    });
  }, [filters, collectionProducts]);

  const clearAll = () => setFilters(defaultFilters);

  return {
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
  };
};