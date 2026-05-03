import DestinationCard from './DestinationCard';
import { DestinationCardSkeleton } from '../ui/LoadingSpinner';

export default function DestinationGrid({ countries, loading, emptyMessage = 'No destinations found.' }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <DestinationCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!countries || countries.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{emptyMessage}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {countries.map(country => (
        <DestinationCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}
