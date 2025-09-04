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

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      // show all pages if less than 4
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        // show first 4 pages
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 1) {
        // show last 4 pages
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // show current in the middle
        pages.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2 > totalPages ? totalPages : currentPage + 2);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center md:justify-end my-10">
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        {/* Pages */}
        {visiblePages.map((page) => (
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

        {/* Next */}
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
