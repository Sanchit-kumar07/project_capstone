import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/destinations/destinationsSlice';
import { SORT_OPTIONS } from '../../utils/constants';

export default function SortDropdown() {
  const dispatch = useDispatch();
  const { filters } = useSelector(s => s.destinations);

  return (
    <select
      value={filters.sortBy}
      onChange={e => dispatch(setFilters({ sortBy: e.target.value }))}
      className="px-4 py-2.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-200"
      id="sort-dropdown"
    >
      {SORT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
