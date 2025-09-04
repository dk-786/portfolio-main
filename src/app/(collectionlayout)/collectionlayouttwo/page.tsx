"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/collections/Navbar";
import Loader from "@/components/collections/Loader";
import CollectionGrid from "../components/CollectionGrid";
import ViewModeToggle from "../components/ViewModeToggle";
import SortSelect from "../components/SortSelect";
import ProductList from "../components/ProductList";
import { VscSettings } from "react-icons/vsc";
import Pagination from "../components/Pagination";
import { TurningTableCard } from "@/components/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { normalize, useCollectionProducts } from "../components/useProducts";
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
function PageContent() {
  const params = useParams();
  const rawParam = String(params?.id ?? "");
  const param = normalize(decodeURIComponent(rawParam));
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridCols, setGridCols] = useState(4);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [filters, setFilters] = useState<Filters | null>(null);

  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  useEffect(() => {
    const checkScreen = () =>
      setProductsPerPage(window.innerWidth < 768 ? 2 : 8);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { sorted } = useCollectionProducts(param, filters, priceRange, sortBy);

  useEffect(() => setCurrentPage(1), [sorted]);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative w-96 bg-white shadow-lg h-full p-4 z-50"
            >
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
                onFiltersChange={setFilters}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container flex flex-col px-6 md:px-12 mt-16 max-w-full justify-center">
        {/* Desktop grid */}
        <div className="hidden md:block">
          <CollectionGrid router={router} />
        </div>

        <div className="md:hidden">
          <TurningTableCard />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4 md:my-6 gap-4">
          <div className="flex items-center gap-6">
            <VscSettings
              className="border border-gray-400 h-8 w-14 rounded cursor-pointer"
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