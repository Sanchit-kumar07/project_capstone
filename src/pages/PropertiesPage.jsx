import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../features/properties/propertiesSlice';
import PropertyGrid from '../components/properties/PropertyGrid';
import FilterSidebar from '../components/properties/FilterSidebar';
import SearchBar from '../components/properties/SearchBar';
import SortDropdown from '../components/properties/SortDropdown';
import Pagination from '../components/properties/Pagination';

export default function PropertiesPage() {
  const dispatch = useDispatch();
  const { items, status, filters, currentPage, totalItems } = useSelector(s => s.properties);
  const [showFilters, setShowFilters] = useState(false);

  const loadProperties = useCallback(() => {
    dispatch(fetchProperties({ ...filters, page: currentPage, limit: 9 }));
  }, [dispatch, filters, currentPage]);

  useEffect(() => { loadProperties(); }, [loadProperties]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Properties</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{totalItems} properties available</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile filter toggle */}
        <button onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 font-medium text-sm text-gray-700 dark:text-gray-300">
          🔧 {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <aside className={`lg:block lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
          <div className="sticky top-20"><FilterSidebar /></div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1"><SearchBar /></div>
            <SortDropdown />
          </div>
          <PropertyGrid properties={items} loading={status === 'loading'} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}
