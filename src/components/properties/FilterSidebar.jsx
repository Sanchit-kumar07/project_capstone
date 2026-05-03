import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../features/properties/propertiesSlice';
import { PROPERTY_TYPES, PROPERTY_STATUSES, CITIES } from '../../utils/constants';
import { memo } from 'react';

const FilterSidebar = memo(function FilterSidebar({ className = '' }) {
  const dispatch = useDispatch();
  const filters = useSelector(s => s.properties.filters);

  const update = (key, value) => dispatch(setFilters({ [key]: value }));

  const selectClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-gray-200";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className={`bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-dark-700 space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
        <button onClick={() => dispatch(clearFilters())} className="text-xs text-primary-600 hover:text-primary-700 font-semibold">Clear All</button>
      </div>

      <div>
        <label className={labelClass}>Property Type</label>
        <select value={filters.type} onChange={e => update('type', e.target.value)} className={selectClass}>
          <option value="">All Types</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>City</label>
        <select value={filters.city} onChange={e => update('city', e.target.value)} className={selectClass}>
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select value={filters.status} onChange={e => update('status', e.target.value)} className={selectClass}>
          <option value="">All Statuses</option>
          {PROPERTY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Min Bedrooms</label>
        <select value={filters.minBeds} onChange={e => update('minBeds', e.target.value)} className={selectClass}>
          <option value="">Any</option>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Min Price</label>
          <input type="number" placeholder="$0" value={filters.minPrice} onChange={e => update('minPrice', e.target.value)} className={selectClass} />
        </div>
        <div>
          <label className={labelClass}>Max Price</label>
          <input type="number" placeholder="Any" value={filters.maxPrice} onChange={e => update('maxPrice', e.target.value)} className={selectClass} />
        </div>
      </div>
    </div>
  );
});

export default FilterSidebar;
