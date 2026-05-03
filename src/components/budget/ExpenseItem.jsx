import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../features/budget/budgetSlice';
import { formatCurrency, getCategoryEmoji, formatDate } from '../../utils/formatters';

export default function ExpenseItem({ expense }) {
  const dispatch = useDispatch();

  return (
    <div className="group flex items-center gap-4 bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all">
      <span className="text-2xl">{getCategoryEmoji(expense.category)}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{expense.description}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(expense.date)} · {expense.category}</p>
      </div>
      <p className="font-bold text-gray-800 dark:text-white whitespace-nowrap">
        {formatCurrency(expense.amount, expense.currency)}
      </p>
      <button
        onClick={() => dispatch(deleteExpense(expense.id))}
        className="w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-all text-sm"
        title="Delete expense"
      >
        🗑️
      </button>
    </div>
  );
}
