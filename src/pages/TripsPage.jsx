import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrips } from '../features/trips/tripsSlice';
import TripCard from '../components/trips/TripCard';
import { TripCardSkeleton } from '../components/ui/LoadingSpinner';

export default function TripsPage() {
  const dispatch = useDispatch();
  const { trips, status } = useSelector(s => s.trips);

  useEffect(() => { dispatch(fetchTrips()); }, [dispatch]);

  const upcoming = trips.filter(t => t.status === 'upcoming');
  const planning = trips.filter(t => t.status === 'planning');
  const completed = trips.filter(t => t.status === 'completed');

  const Section = ({ title, items, emoji }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{emoji} {title} ({items.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white">✈️ My Trips</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{trips.length} trips total</p>
        </div>
        <Link to="/trips/new" className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25">+ New Trip</Link>
      </div>
      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <TripCardSkeleton key={i} />)}
        </div>
      )}
      {status === 'succeeded' && trips.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🌴</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No trips yet</h3>
          <p className="text-gray-500 mb-6">Start by creating your first trip!</p>
          <Link to="/trips/new" className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl">🚀 Create Trip</Link>
        </div>
      )}
      <Section title="Upcoming" items={upcoming} emoji="📅" />
      <Section title="Planning" items={planning} emoji="📝" />
      <Section title="Completed" items={completed} emoji="✅" />
    </div>
  );
}
