import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../features/destinations/destinationsSlice';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedQuery }));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search countries..."
        className="w-full pl-10 pr-10 py-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-800 dark:text-white placeholder:text-gray-400"
        id="destination-search"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
