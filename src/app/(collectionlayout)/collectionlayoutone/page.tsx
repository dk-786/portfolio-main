"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import Loader from "@/components/collections/Loader";
import { collections, products, productss } from "@/utils/constants/constant";
import { Product } from "@/types/product";
import CollectionGrid from "./components/CollectionGrid";
import ViewModeToggle from "./components/ViewModeToggle";
import SortSelect from "./components/SortSelect";
import ProductList from "./components/ProductList";
import { TurningTableCard } from "@/components/sidebar";
import { useAppContext } from "@/components/context/AppContext";
import Pagination from "./components/Pagination";

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
  const { getConvertedPrice } = useAppContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [loading, setLoading] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    ...priceRange,
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;
  const openFilterModal = () => {
    setTempPriceRange([...priceRange]);
    setFilterOpen(true);
  };
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
      if (
        filters.categories.length &&
        !filters.categories.includes(p.category!)
      )
        return false;
      if (
        filters.composition.length &&
        !filters.composition.includes(p.composition!)
      )
        return false;
      if (
        filters.property.length &&
        !(p.properties ?? []).some((pp) => filters.property.includes(pp))
      )
        return false;
      if (filters.brand.length && !filters.brand.includes(p.brand!))
        return false;
      if (filters.paperType.length && !filters.paperType.includes(p.paperType!))
        return false;

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
  const productCount = sorted.length;

  useEffect(() => setCurrentPage(1), [sorted]);

  return (
    <>
      <div className="hidden lg:flex w-full">
        <Navbar
          id={rawParam}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {loading && <Loader />}

        <div className="container flex flex-col px-4 md:px-12">
          <div className="hidden md:block">
            <CollectionGrid router={router} />
          </div>

          <div className="flex justify-between items-center my-4 md:my-6">
            <ViewModeToggle
              viewMode={viewMode}
              setViewMode={setViewMode}
              gridCols={gridCols}
              setGridCols={setGridCols}
              productCount={sorted.length}
            />
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>

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
      </div>
      <div className="flex flex-col w-full px-6 lg:hidden mb-20">
        <TurningTableCard />
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
