"use client";
import React, { forwardRef } from 'react';
import { FiSearch, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface ShowsearchProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

const Showsearch = forwardRef<HTMLDivElement, ShowsearchProps>(({
  showSearch,
  setShowSearch
}, ref) => {
  if (!showSearch) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-20 z-40 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
      {/* Search Modal */}
      <div
        className="fixed top-0 left-0 w-full bg-white md:p-8 shadow-lg z-50"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop/Laptop Layout - Single Line */}
        <div className="hidden md:flex items-center justify-between px-6 py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="flex items-center w-1/2 border border-gray-300 rounded" >
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 outline-none"
              />
              <button className="px-4 text-gray-600 hover:text-black cursor-pointer">
                <FiSearch size={20} />
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setShowSearch(false)}
              className="text-2xl text-gray-700 hover:text-black ml-4 cursor-pointer"
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Mobile Layout - Two Lines */}
        <div className="md:hidden p-4">
          <div>
            {/* First Line - Logo and Cancel Button */}
            <div className="flex items-center justify-between mb-4 h-10">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
              <button
                onClick={() => setShowSearch(false)}
                className="text-2xl text-gray-700 hover:text-black"
              >
                <FiX />
              </button>
            </div>

            {/* Second Line - Search Bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-lg">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 outline-none rounded-l-lg"
              />
              <button className="px-4 py-3 text-gray-600 hover:text-black bg-gray-50 rounded-r-lg cursor-pointer">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Showsearch.displayName = 'Showsearch';

export default Showsearch;
