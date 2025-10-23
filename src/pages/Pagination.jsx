// Pagination.js
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 justify-center my-4 text-red-600">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border ${
            page === currentPage ? 'font-bold text-black' : ''
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
