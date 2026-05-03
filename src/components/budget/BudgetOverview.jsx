import { formatCurrency } from '../../utils/formatters';

export default function BudgetOverview({ budget, expenses, currency }) {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;
  const percentage = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = totalSpent > budget;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">💰 Budget Overview</h3>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Budget</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(budget, currency)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Spent</p>
          <p className={`text-xl font-bold ${isOverBudget ? 'text-danger-500' : 'text-secondary-500'}`}>
            {formatCurrency(totalSpent, currency)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Remaining</p>
          <p className={`text-xl font-bold ${isOverBudget ? 'text-danger-500' : 'text-accent-500'}`}>
            {formatCurrency(Math.abs(remaining), currency)}
            {isOverBudget && <span className="text-xs ml-1">over</span>}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-100 dark:bg-dark-900 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOverBudget ? 'bg-danger-500' : percentage > 80 ? 'bg-secondary-500' : 'bg-accent-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-right">{percentage.toFixed(0)}% spent</p>
    </div>
  );
}
