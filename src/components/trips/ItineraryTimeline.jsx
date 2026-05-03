import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItineraryItem, updateItineraryItem } from '../../features/trips/tripsSlice';
import { getCategoryEmoji } from '../../utils/formatters';
import AddActivityForm from './AddActivityForm';

export default function ItineraryTimeline({ items, tripId, dayCount }) {
  const dispatch = useDispatch();
  const [showFormForDay, setShowFormForDay] = useState(null);

  const itemsByDay = {};
  for (let d = 1; d <= dayCount; d++) itemsByDay[d] = [];
  items.forEach(item => {
    if (itemsByDay[item.day]) itemsByDay[item.day].push(item);
    else itemsByDay[item.day] = [item];
  });

  // Sort items within each day by time
  Object.values(itemsByDay).forEach(dayItems => {
    dayItems.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  });

  return (
    <div className="space-y-6">
      {Object.entries(itemsByDay).map(([day, dayItems]) => (
        <div key={day} className="animate-fade-in">
          {/* Day header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-primary-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25">
              D{day}
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Day {day}</h3>
            <button
              onClick={() => setShowFormForDay(showFormForDay === Number(day) ? null : Number(day))}
              className="ml-auto text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              {showFormForDay === Number(day) ? '✕ Cancel' : '+ Add'}
            </button>
          </div>

          {/* Activities */}
          <div className="ml-5 border-l-2 border-primary-200 dark:border-primary-800 pl-6 space-y-3">
            {dayItems.length === 0 && (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic py-2">No activities yet</p>
            )}
            {dayItems.map(item => (
              <div
                key={item.id}
                className={`relative group bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all ${
                  item.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="absolute -left-[31px] w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-dark-950" />
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getCategoryEmoji(item.category)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {item.time && (
                        <span className="text-xs font-mono text-primary-500 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded">
                          {item.time}
                        </span>
                      )}
                      <h4 className={`font-semibold text-gray-800 dark:text-white text-sm ${item.completed ? 'line-through' : ''}`}>
                        {item.title}
                      </h4>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => dispatch(updateItineraryItem({ id: item.id, updates: { completed: !item.completed } }))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-dark-900 text-xs"
                      title={item.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {item.completed ? '↩️' : '✅'}
                    </button>
                    <button
                      onClick={() => dispatch(deleteItineraryItem(item.id))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-danger-50 dark:hover:bg-danger-900/20 text-xs"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add activity form */}
          {showFormForDay === Number(day) && (
            <div className="ml-5 pl-6 mt-3 animate-fade-in">
              <AddActivityForm
                tripId={tripId}
                day={Number(day)}
                onDone={() => setShowFormForDay(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
