import { useState, useEffect } from 'react';
import { getWeatherForecast } from '../../api/weatherApi';
import { WEATHER_CODES } from '../../utils/constants';

export default function WeatherWidget({ lat, lng, cityName }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    setLoading(true);
    getWeatherForecast(lat, lng)
      .then(data => setWeather(data))
      .catch(() => setError('Unable to load weather'))
      .finally(() => setLoading(false));
  }, [lat, lng]);

  if (loading) return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md">
      <div className="skeleton h-6 w-40 mb-4" />
      <div className="flex gap-3 overflow-x-auto">
        {Array.from({ length: 7 }).map((_, i) => <div key={i} className="skeleton h-24 w-20 shrink-0 rounded-xl" />)}
      </div>
    </div>
  );

  if (error || !weather) return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md text-center text-gray-400 text-sm">
      {error || 'Weather data unavailable'}
    </div>
  );

  const daily = weather.daily;
  const days = daily.time?.map((date, i) => ({
    date,
    max: daily.temperature_2m_max?.[i],
    min: daily.temperature_2m_min?.[i],
    code: daily.weathercode?.[i],
    precip: daily.precipitation_probability_max?.[i],
  })) || [];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        🌤️ 7-Day Forecast {cityName ? `· ${cityName}` : ''}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {days.map((d, i) => {
          const wc = WEATHER_CODES[d.code] || { desc: 'Unknown', icon: '❓' };
          return (
            <div
              key={i}
              className={`shrink-0 w-24 text-center p-3 rounded-xl border transition-colors ${
                i === 0 ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : 'border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-dark-900'
              }`}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-2xl my-1">{wc.icon}</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white">{Math.round(d.max)}°</p>
              <p className="text-xs text-gray-400">{Math.round(d.min)}°</p>
              {d.precip != null && (
                <p className="text-[10px] text-primary-500 mt-1">💧 {d.precip}%</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
