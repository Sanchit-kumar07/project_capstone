import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../features/trips/tripsSlice';
import { StatsCards, SpendingByCategory, BudgetVsSpent } from '../components/dashboard/Charts';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import * as tripsApi from '../api/tripsApi';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { trips, status } = useSelector(s => s.trips);
  const [allExpenses, setAllExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  useEffect(() => {
    if (trips.length > 0) {
      Promise.all(trips.map(t => tripsApi.getExpenses(t.id)))
        .then(results => setAllExpenses(results.flat()))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (status === 'succeeded') {
      setLoading(false);
    }
  }, [trips, status]);

  if (status === 'loading' || loading) return <LoadingSpinner size="lg" text="Loading analytics..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white mb-8">📊 Travel Dashboard</h1>
      <div className="space-y-8">
        <StatsCards trips={trips} allExpenses={allExpenses} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingByCategory expenses={allExpenses} />
          <BudgetVsSpent trips={trips} allExpenses={allExpenses} />
        </div>
      </div>
    </div>
  );
}
