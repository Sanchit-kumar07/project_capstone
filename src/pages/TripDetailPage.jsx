import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripById, deleteTrip, fetchItineraryItems, clearSelectedTrip } from '../features/trips/tripsSlice';
import { fetchExpenses } from '../features/budget/budgetSlice';
import ItineraryTimeline from '../components/trips/ItineraryTimeline';
import BudgetOverview from '../components/budget/BudgetOverview';
import ExpenseItem from '../components/budget/ExpenseItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Modal from '../components/ui/Modal';
import { formatDateRange, getDayCount } from '../utils/formatters';

export default function TripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTrip: trip, itineraryItems, status } = useSelector(s => s.trips);
  const { expenses } = useSelector(s => s.budget);
  const [showDelete, setShowDelete] = useState(false);
  const [tab, setTab] = useState('itinerary');

  useEffect(() => {
    dispatch(fetchTripById(id));
    dispatch(fetchItineraryItems(id));
    dispatch(fetchExpenses(id));
    return () => dispatch(clearSelectedTrip());
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deleteTrip(id)).then(() => navigate('/trips'));
  };

  if (status === 'loading') return <LoadingSpinner size="lg" text="Loading trip..." />;
  if (!trip) return <div className="text-center py-16 text-gray-400">Trip not found</div>;

  const dayCount = getDayCount(trip.startDate, trip.endDate);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <Link to="/trips" className="text-primary-500 hover:text-primary-600 text-sm font-medium mb-6 inline-flex items-center gap-1">← Back to Trips</Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <img src={trip.coverImage || `https://picsum.photos/seed/${trip.id}/800/400`} alt={trip.name} className="w-full h-56 sm:h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize mb-2 inline-block ${trip.status === 'upcoming' ? 'bg-primary-500/80 text-white' : trip.status === 'completed' ? 'bg-accent-500/80 text-white' : 'bg-yellow-500/80 text-white'}`}>{trip.status}</span>
            <h1 className="font-display text-3xl font-extrabold text-white">{trip.name}</h1>
            <p className="text-white/80 text-sm mt-1">📍 {trip.destination} · 📅 {formatDateRange(trip.startDate, trip.endDate)} · {dayCount} days</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/trips/${id}/edit`} className="px-4 py-2 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-lg hover:bg-white/30 border border-white/30">✏️ Edit</Link>
            <button onClick={() => setShowDelete(true)} className="px-4 py-2 bg-danger-500/80 text-white text-sm font-medium rounded-lg hover:bg-danger-600">🗑️</button>
          </div>
        </div>
      </div>

      {/* Notes */}
      {trip.notes && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50 mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">📝 {trip.notes}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-dark-800 rounded-xl p-1 w-fit">
        {['itinerary', 'budget'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${tab === t ? 'bg-white dark:bg-dark-900 text-primary-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'itinerary' ? '📋 Itinerary' : '💰 Budget'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'itinerary' && (
        <ItineraryTimeline items={itineraryItems} tripId={id} dayCount={dayCount} />
      )}
      {tab === 'budget' && (
        <div className="space-y-6">
          <BudgetOverview budget={trip.budget} expenses={expenses} currency={trip.currency} />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 dark:text-white">Expenses</h3>
              <Link to={`/trips/${id}/budget`} className="text-sm text-primary-500 hover:text-primary-600 font-medium">Manage Budget →</Link>
            </div>
            {expenses.length === 0 ? <p className="text-gray-400 text-sm py-4">No expenses yet</p> : expenses.map(e => <ExpenseItem key={e.id} expense={e} />)}
          </div>
        </div>
      )}

      {/* Delete modal */}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Trip">
        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete <strong>{trip.name}</strong>? This cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setShowDelete(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-danger-500 hover:bg-danger-600 text-white font-medium rounded-lg">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
