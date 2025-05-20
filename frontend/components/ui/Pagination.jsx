import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      return pages;
    }

    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      ),
      1
    );

    return Array.from(
      { length: maxVisiblePages },
      (_, i) => start + i
    );
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300",
          currentPage === 1
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "hover:bg-gray-50"
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {renderPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md border",
            currentPage === page
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-300 hover:bg-gray-50"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300",
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "hover:bg-gray-50"
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination; 