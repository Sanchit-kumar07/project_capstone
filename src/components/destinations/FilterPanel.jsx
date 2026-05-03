import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../features/destinations/destinationsSlice';
import { REGIONS } from '../../utils/constants';
import { memo } from 'react';

const FilterPanel = memo(function FilterPanel() {
  const dispatch = useDispatch();
  const { filters } = useSelector(s => s.destinations);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Region filter */}
      <select
        value={filters.region}
        onChange={e => dispatch(setFilters({ region: e.target.value }))}
        className="px-4 py-2.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-200"
        id="region-filter"
      >
        <option value="">All Regions</option>
        {REGIONS.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {/* Clear filters */}
      {(filters.search || filters.region) && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="px-4 py-2.5 text-sm font-medium text-danger-500 hover:bg-danger-500/10 rounded-xl transition-colors"
          id="clear-filters"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
});

export default FilterPanel;
