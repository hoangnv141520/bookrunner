import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
                {/* Previous page button */}
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={`w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Only show limited number of pages with ellipsis for better UX
                    const showPageNumber = pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                    if (!showPageNumber) {
                        if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                            return (
                                <span key={`ellipsis-${pageNumber}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    }

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={currentPage === pageNumber ? 'page' : undefined}
                            className={`w-10 h-10 flex items-center justify-center rounded ${currentPage === pageNumber
                                ? 'bg-purple-900/50 border border-purple-700/50 text-purple-300'
                                : 'bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50'
                                } transition-colors duration-300`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                {/* Next page button */}
                <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className={`w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;