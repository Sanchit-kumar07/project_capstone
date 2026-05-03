import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries } from '../features/destinations/destinationsSlice';
import DestinationGrid from '../components/destinations/DestinationGrid';
import SearchBar from '../components/destinations/SearchBar';
import FilterPanel from '../components/destinations/FilterPanel';
import SortDropdown from '../components/destinations/SortDropdown';
import Pagination from '../components/destinations/Pagination';
import { ITEMS_PER_PAGE } from '../utils/constants';

export default function DestinationsPage() {
  const dispatch = useDispatch();
  const { countries, filters, currentPage, status } = useSelector(s => s.destinations);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllCountries());
  }, [dispatch, status]);

  // Client-side filtering, sorting, pagination
  const filtered = useMemo(() => {
    let result = [...countries];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q) ||
        c.region?.toLowerCase().includes(q)
      );
    }

    // Region filter
    if (filters.region) {
      result = result.filter(c => c.region === filters.region);
    }

    // Sort
    switch (filters.sortBy) {
      case 'name-asc': result.sort((a, b) => (a.name?.common || '').localeCompare(b.name?.common || '')); break;
      case 'name-desc': result.sort((a, b) => (b.name?.common || '').localeCompare(a.name?.common || '')); break;
      case 'population-desc': result.sort((a, b) => (b.population || 0) - (a.population || 0)); break;
      case 'population-asc': result.sort((a, b) => (a.population || 0) - (b.population || 0)); break;
      case 'area-desc': result.sort((a, b) => (b.area || 0) - (a.area || 0)); break;
      default: break;
    }

    return result;
  }, [countries, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white">
          🌍 Explore Destinations
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Browse {countries.length} countries from around the world
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <SearchBar />
        <div className="flex items-center gap-3 flex-wrap">
          <FilterPanel />
          <SortDropdown />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Showing {paginated.length} of {filtered.length} destinations
      </p>

      {/* Grid */}
      <DestinationGrid countries={paginated} loading={status === 'loading'} />

      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
