import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/destinations/destinationsSlice';

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(s => s.destinations);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    if (start > 1) { pages.push(1); if (start > 2) pages.push('...'); }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) { if (end < totalPages - 1) pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-8" id="pagination-controls">
      <button
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-600 dark:text-gray-300"
      >
        ← Prev
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">…</span>
        ) : (
          <button
            key={page}
            onClick={() => dispatch(setPage(page))}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-600 dark:text-gray-300"
      >
        Next →
      </button>
    </div>
  );
}
