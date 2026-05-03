import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../features/budget/budgetSlice';
import { EXPENSE_CATEGORIES } from '../../utils/constants';

export default function AddExpenseForm({ tripId, currency, onDone }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    description: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Must be positive';
    if (!form.date) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(addExpense({
      ...form,
      amount: Number(form.amount),
      tripId,
      currency,
    }));
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="What did you spend on?"
          className={`w-full px-4 py-3 bg-gray-50 dark:bg-dark-900 border rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white ${errors.description ? 'border-danger-500' : 'border-gray-200 dark:border-gray-700'}`}
        />
        {errors.description && <p className="text-xs text-danger-500 mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="number"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
            min="0"
            step="0.01"
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-dark-900 border rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white ${errors.amount ? 'border-danger-500' : 'border-gray-200 dark:border-gray-700'}`}
          />
          {errors.amount && <p className="text-xs text-danger-500 mt-1">{errors.amount}</p>}
        </div>
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="px-4 py-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
        >
          {EXPENSE_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <input
        type="date"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
      />

      <button
        type="submit"
        className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/25"
      >
        Add Expense
      </button>
    </form>
  );
}
