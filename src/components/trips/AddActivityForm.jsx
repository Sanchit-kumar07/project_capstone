import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItineraryItem } from '../../features/trips/tripsSlice';
import { ACTIVITY_TYPES } from '../../utils/constants';

export default function AddActivityForm({ tripId, day, onDone }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: '', description: '', time: '', category: 'sightseeing' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    dispatch(addItineraryItem({ ...form, tripId, day }));
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary-50 dark:bg-primary-900/10 rounded-xl p-4 border border-primary-200 dark:border-primary-800 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Activity title *"
          className="col-span-2 px-3 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
          className="px-3 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
        />
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="px-3 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
        >
          {ACTIVITY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <textarea
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        placeholder="Description (optional)"
        rows={2}
        className="w-full px-3 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none text-gray-800 dark:text-white"
      />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onDone} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors">
          Add Activity
        </button>
      </div>
    </form>
  );
}
