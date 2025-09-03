"use client";
import React from "react";

type Props = {
  total: number;
  currentPage: number;
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
};

const Pagination: React.FC<Props> = ({ total, currentPage, setCurrentPage, perPage }) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  if (totalPages <= 1) return null;
  

  return (
    <div className="flex justify-center md:justify-end my-10">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === currentPage ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
