import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../features/properties/propertiesSlice';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilters({ search: debouncedQuery }));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Search properties..."
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400" />
      {query && (
        <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">✕</button>
      )}
    </div>
  );
}
