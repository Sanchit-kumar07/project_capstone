import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { EXPENSE_CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#10b981', '#ec4899', '#64748b'];

export function StatsCards({ trips, allExpenses }) {
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalSpent = allExpenses.reduce((s, e) => s + e.amount, 0);
  const completed = trips.filter(t => t.status === 'completed').length;
  const upcoming = trips.filter(t => t.status === 'upcoming').length;

  const cards = [
    { label: 'Total Trips', value: trips.length, icon: '✈️', color: 'from-primary-500 to-primary-600' },
    { label: 'Total Budget', value: formatCurrency(totalBudget), icon: '💰', color: 'from-secondary-500 to-secondary-600' },
    { label: 'Total Spent', value: formatCurrency(totalSpent), icon: '💸', color: 'from-accent-500 to-accent-600' },
    { label: 'Upcoming', value: upcoming, icon: '📅', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
          </div>
          <p className="text-2xl font-bold">{card.value}</p>
          <p className="text-white/80 text-sm mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export function SpendingByCategory({ expenses }) {
  const grouped = {};
  expenses.forEach(e => {
    grouped[e.category] = (grouped[e.category] || 0) + e.amount;
  });
  const data = Object.entries(grouped).map(([cat, amount]) => {
    const catInfo = EXPENSE_CATEGORIES.find(c => c.value === cat);
    return { name: catInfo?.label || cat, value: amount };
  });

  if (data.length === 0) return <p className="text-center text-gray-400 py-8">No expense data yet</p>;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name.split(' ').pop()} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(v)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetVsSpent({ trips, allExpenses }) {
  const data = trips.map(t => {
    const spent = allExpenses.filter(e => e.tripId === t.id).reduce((s, e) => s + e.amount, 0);
    return { name: t.name.length > 12 ? t.name.slice(0, 12) + '…' : t.name, Budget: t.budget, Spent: spent };
  });

  if (data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📈 Budget vs Spent</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
          <Bar dataKey="Budget" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Spent" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
