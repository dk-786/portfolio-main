"use client";
import React from "react";

type Props = {
  sortBy: string;
  setSortBy: (v: string) => void;
};

const SortSelect: React.FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm text-gray-600">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border-1 rounded px-2 py-2 text-sm cursor-pointer"
      >
        <option value="relevance">Relevance</option>
        <option value="price_low_high">Price, low to high</option>
        <option value="price_high_low">Price, high to low</option>
        <option value="name_az">Name, A to Z</option> 
        <option value="name_za">Name, Z to A</option>
      </select>
    </div>
  );
};

export default SortSelect;
