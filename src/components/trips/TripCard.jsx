import { Link } from 'react-router-dom';
import { formatDateRange, getDayCount, formatCurrency } from '../../utils/formatters';
import { memo } from 'react';

const TripCard = memo(function TripCard({ trip }) {
  const statusColors = {
    planning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    upcoming: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    completed: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
  };

  return (
    <Link
      to={`/trips/${trip.id}`}
      className="group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      id={`trip-card-${trip.id}`}
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage || `https://picsum.photos/seed/${trip.id}/800/400`}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">{trip.name}</h3>
          <p className="text-white/80 text-sm drop-shadow">{trip.destination}</p>
        </div>
        <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-lg capitalize ${statusColors[trip.status] || statusColors.planning}`}>
          {trip.status}
        </span>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>📅 {formatDateRange(trip.startDate, trip.endDate)}</span>
          <span>🕐 {getDayCount(trip.startDate, trip.endDate)} days</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            {formatCurrency(trip.budget, trip.currency)}
          </span>
          <span className="text-xs text-primary-500 font-medium group-hover:underline">View details →</span>
        </div>
      </div>
    </Link>
  );
});

export default TripCard;
