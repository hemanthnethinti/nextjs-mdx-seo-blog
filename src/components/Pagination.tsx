import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav data-testid="pagination" className="flex justify-center items-center space-x-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}/${currentPage - 1}`}
          data-testid="pagination-prev"
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Previous
        </Link>
      )}

      <div className="flex space-x-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={page === 1 ? basePath : `${basePath}/${page}`}
            data-testid={`pagination-page-${page}`}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          data-testid="pagination-next"
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
