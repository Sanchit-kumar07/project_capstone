import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/properties/propertiesSlice';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(s => s.properties);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => dispatch(setPage(currentPage - 1))} disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 disabled:opacity-40 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors text-gray-700 dark:text-gray-300">
        ← Prev
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => dispatch(setPage(p))}
          className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
            p === currentPage ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-110' : 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 hover:bg-primary-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
          }`}>
          {p}
        </button>
      ))}
      <button onClick={() => dispatch(setPage(currentPage + 1))} disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 disabled:opacity-40 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors text-gray-700 dark:text-gray-300">
        Next →
      </button>
    </div>
  );
}
