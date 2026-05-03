import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/properties/propertiesSlice';
import { SORT_OPTIONS } from '../../utils/constants';

export default function SortDropdown() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector(s => s.properties.filters);

  return (
    <select value={sortBy} onChange={e => dispatch(setFilters({ sortBy: e.target.value }))}
      className="px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-gray-200">
      <option value="">Sort by</option>
      {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
