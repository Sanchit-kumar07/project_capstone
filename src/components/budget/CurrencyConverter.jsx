import { useState, useEffect } from 'react';
import * as currencyApi from '../../api/currencyApi';

export default function CurrencyConverter() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currencyApi.getSupportedCurrencies().then(setCurrencies).catch(() => {});
  }, []);

  useEffect(() => {
    if (!amount || amount <= 0 || from === to) {
      setResult(from === to ? amount : null);
      return;
    }
    setLoading(true);
    currencyApi.convertCurrency(from, to, amount)
      .then(data => setResult(data.rates?.[to]))
      .catch(() => setResult(null))
      .finally(() => setLoading(false));
  }, [from, to, amount]);

  const currencyOptions = Object.entries(currencies);

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">💱 Currency Converter</h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            min="0"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl text-lg font-bold focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <select
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
          >
            {currencyOptions.map(([code, name]) => (
              <option key={code} value={code}>{code} — {name}</option>
            ))}
          </select>
          <button
            onClick={() => { setFrom(to); setTo(from); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 hover:bg-primary-200 transition-colors text-lg"
          >
            ⇄
          </button>
          <select
            value={to}
            onChange={e => setTo(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white"
          >
            {currencyOptions.map(([code, name]) => (
              <option key={code} value={code}>{code} — {name}</option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-center">
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : result !== null ? (
            <>
              <p className="text-white/80 text-sm">{amount} {from} =</p>
              <p className="text-white text-2xl font-bold mt-1">
                {typeof result === 'number' ? result.toFixed(2) : result} {to}
              </p>
            </>
          ) : (
            <p className="text-white/80 text-sm">Enter amount to convert</p>
          )}
        </div>
      </div>
    </div>
  );
}
