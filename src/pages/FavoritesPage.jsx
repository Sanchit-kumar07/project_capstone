import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../features/properties/propertiesSlice';
import PropertyCard from '../components/properties/PropertyCard';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(s => s.properties);
  const favIds = useSelector(s => s.favorites.ids);

  useEffect(() => { if (status === 'idle') dispatch(fetchProperties({})); }, [dispatch, status]);

  const favProperties = useMemo(() => items.filter(p => favIds.includes(p.id)), [items, favIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Saved Properties</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{favProperties.length} properties saved to your favorites</p>
      {favProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favProperties.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Click the heart icon on any property to save it here.</p>
        </div>
      )}
    </div>
  );
}
