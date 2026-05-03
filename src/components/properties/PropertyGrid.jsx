import PropertyCard from './PropertyCard';
import { PropertyCardSkeleton } from '../ui/LoadingSpinner';

export default function PropertyGrid({ properties, loading, emptyMessage = 'No properties found.' }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏚️</div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p, i) => (
        <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
          <PropertyCard property={p} />
        </div>
      ))}
    </div>
  );
}
