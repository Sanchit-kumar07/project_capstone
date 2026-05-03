import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripById } from '../features/trips/tripsSlice';
import { fetchExpenses } from '../features/budget/budgetSlice';
import BudgetOverview from '../components/budget/BudgetOverview';
import ExpenseItem from '../components/budget/ExpenseItem';
import AddExpenseForm from '../components/budget/AddExpenseForm';
import CurrencyConverter from '../components/budget/CurrencyConverter';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function BudgetPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTrip: trip } = useSelector(s => s.trips);
  const { expenses, status } = useSelector(s => s.budget);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchTripById(id));
    dispatch(fetchExpenses(id));
  }, [id, dispatch]);

  if (!trip) return <LoadingSpinner size="lg" text="Loading budget..." />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <Link to={`/trips/${id}`} className="text-primary-500 text-sm font-medium mb-6 inline-block">← Back to {trip.name}</Link>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white">💰 Budget Manager</h1>
        <button onClick={() => setShowAdd(true)} className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/25">
          + Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BudgetOverview budget={trip.budget} expenses={expenses} currency={trip.currency} />
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">All Expenses ({expenses.length})</h3>
            {expenses.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No expenses yet. Add your first one!</p>
            ) : (
              <div className="space-y-3">
                {expenses.map(e => <ExpenseItem key={e.id} expense={e} />)}
              </div>
            )}
          </div>
        </div>
        <div>
          <CurrencyConverter />
        </div>
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Expense">
        <AddExpenseForm tripId={id} currency={trip.currency} onDone={() => setShowAdd(false)} />
      </Modal>
    </div>
  );
}
