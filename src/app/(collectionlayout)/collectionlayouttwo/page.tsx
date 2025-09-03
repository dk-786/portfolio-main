"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import Loader from "@/components/collections/Loader";
import { collections, products, productss } from "@/utils/constants/constant";
import { Product } from "@/types/product";
import CollectionGrid from "../components/CollectionGrid";
import ViewModeToggle from "../components/ViewModeToggle";
import SortSelect from "../components/SortSelect";
import ProductList from "../components/ProductList";
import { VscSettings } from "react-icons/vsc";
import Pagination from "../components/Pagination";
import { TurningTableCard } from "@/components/sidebar";

const allProducts: Product[] = [...products, ...productss];

function normalize(s: string) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function PageContent() {
  const params = useParams();
  const rawParam = String(params?.id ?? "");
  const param = normalize(decodeURIComponent(rawParam));
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false); // NEW STATE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [priceRange]);

  const collection = useMemo(
    () =>
      collections.find((c) => {
        const idNormalized = normalize(String(c.id));
        const titleNormalized = normalize(String(c.title));
        return idNormalized === param || titleNormalized === param;
      }),
    [param]
  );

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

  const filters = useMemo(() => {
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
  }, [searchParams]);

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      if (filters.inStock && !p.available) return false;
      if (filters.notAvailable && p.available) return false;
      const price =
        parseFloat(String(p.newPrice).replace(/[^0-9.-]+/g, "")) || 0;
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
            parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, "")) -
            parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "price_high_low":
        copy.sort(
          (a, b) =>
            parseFloat(String(b.newPrice).replace(/[^0-9.-]+/g, "")) -
            parseFloat(String(a.newPrice).replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "name_az":
        copy.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        break;
      case "name_za":
        copy.sort((a, b) => String(b.name).localeCompare(String(a.name)));
        break;
    }
    return copy;
  }, [filtered, sortBy]);

  useEffect(() => setCurrentPage(1), [sorted]);

  return (
    <>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="relative w-96 bg-white shadow-lg h-full p-4 z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-2 right-14 text-black cursor-pointer"
            >
              ✕
            </button>
            <Navbar
              id={rawParam}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              variant="sidebar"
            />
          </div>
        </div>
      )}

      <div className="container flex flex-col px-6 md:px-12 mt-16">
        {/* Desktop grid */}
        <div className="hidden md:block">
          <CollectionGrid router={router} />
        </div>

       <div className="md:hidden">
         <TurningTableCard />
       </div>

        {/* Mobile + Desktop Controls */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between my-4 md:my-6 gap-4">
          {/* First row: Settings + Grid View */}
          <div className="flex items-center gap-3">
            <VscSettings
              className="border border-gray-400 h-8 w-8 rounded cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />

            <ViewModeToggle
              viewMode={viewMode}
              setViewMode={setViewMode}
              gridCols={gridCols}
              setGridCols={setGridCols}
              productCount={sorted.length}
            />
          </div>

          {/* Second row (mobile) or inline (desktop): Sorting */}
          <div className="flex items-center">
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
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
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
