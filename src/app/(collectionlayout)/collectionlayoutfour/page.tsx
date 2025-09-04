"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import Loader from "@/components/collections/Loader";
import CollectionGrid from "../components/CollectionGrid";
import ViewModeToggle from "../components/ViewModeToggle";
import SortSelect from "../components/SortSelect";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { TurningTableCard } from "@/components/sidebar";
import { normalize, useCollectionProducts } from "../components/useProducts";

function PageContentGrouped() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawParam = String(params?.id ?? "");
  const param = normalize(decodeURIComponent(rawParam));
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState(4);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  // Filters from search params
  const filters = useCollectionFilters(searchParams);

  // Hook to get filtered + sorted products
  const { sorted } = useCollectionProducts(param, filters, priceRange, sortBy);

  useEffect(() => {
    const checkScreen = () =>
      setProductsPerPage(window.innerWidth < 768 ? 2 : 8);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => setCurrentPage(1), [sorted]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [priceRange]);

  return (
    <div className="container flex flex-col px-6 md:px-12 mt-16 max-w-full justify-center">
      <div className="hidden md:block">
        <CollectionGrid router={router} />
      </div>
      <div className="md:hidden">
        <TurningTableCard />
      </div>

      <div className="w-full mb-5 border-1">
        <Navbar
          id={rawParam}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          variant="grouped"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4 md:my-6 gap-4">
        <div className="flex items-center gap-6">
        
          <ViewModeToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            gridCols={gridCols}
            setGridCols={setGridCols}
            productCount={sorted.length}
          />
        </div>
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {loading && <Loader />}

      <ProductList
        products={sorted}
        viewMode={viewMode}
        gridCols={gridCols}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        router={router}
      />

      <Pagination
        total={sorted.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={productsPerPage}
      />
    </div>
  );
}

export default function PageGrouped() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContentGrouped />
    </Suspense>
  );
}

// Helper to extract filters from search params
function useCollectionFilters(
  searchParams: ReturnType<typeof useSearchParams>
) {
  const parseList = (value: string | null) =>
    value
      ? value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  return {
    inStock: searchParams.get("inStock") === "true",
    notAvailable: searchParams.get("notAvailable") === "true",
    categories: parseList(searchParams.get("categories")),
    composition: parseList(searchParams.get("composition")),
    property: parseList(searchParams.get("property")),
    brand: parseList(searchParams.get("brand")),
    paperType: parseList(searchParams.get("paperType")),
  };
}
