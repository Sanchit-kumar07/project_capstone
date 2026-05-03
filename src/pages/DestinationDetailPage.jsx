import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryByCode, clearSelectedCountry } from '../features/destinations/destinationsSlice';
import WeatherWidget from '../components/weather/WeatherWidget';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatNumber } from '../utils/formatters';
import { getDestinationImage } from '../utils/destinationImages';

export default function DestinationDetailPage() {
  const { code } = useParams();
  const dispatch = useDispatch();
  const { selectedCountry: country, status, error } = useSelector(s => s.destinations);

  useEffect(() => {
    dispatch(fetchCountryByCode(code));
    return () => dispatch(clearSelectedCountry());
  }, [code, dispatch]);

  if (status === 'loading') return <LoadingSpinner size="lg" text="Loading destination..." />;
  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-xl text-danger-500 mb-4">❌ {error}</p>
      <Link to="/destinations" className="text-primary-500 hover:underline">← Back to destinations</Link>
    </div>
  );
  if (!country) return null;

  const name = country.name?.common || 'Unknown';
  const official = country.name?.official;
  const flag = country.flags?.svg || country.flags?.png;
  const coat = country.coatOfArms?.svg;
  const capital = country.capital?.[0] || 'N/A';
  const region = country.region;
  const subregion = country.subregion;
  const population = country.population;
  const area = country.area;
  const currencies = country.currencies ? Object.entries(country.currencies).map(([code, c]) => `${c.name} (${c.symbol || code})`) : [];
  const languages = country.languages ? Object.values(country.languages) : [];
  const timezones = country.timezones || [];
  const latlng = country.latlng || [];
  const maps = country.maps?.googleMaps;
  const borders = country.borders || [];
  const continents = country.continents || [];
  const car = country.car;
  const startOfWeek = country.startOfWeek;

  const infoItems = [
    { label: 'Capital', value: capital, icon: '🏛️' },
    { label: 'Region', value: `${region}${subregion ? ` · ${subregion}` : ''}`, icon: '🌍' },
    { label: 'Population', value: formatNumber(population), icon: '👥' },
    { label: 'Area', value: `${area?.toLocaleString()} km²`, icon: '📐' },
    { label: 'Continents', value: continents.join(', '), icon: '🗺️' },
    { label: 'Timezones', value: timezones.slice(0, 3).join(', ') + (timezones.length > 3 ? ` +${timezones.length - 3} more` : ''), icon: '🕐' },
    { label: 'Drives on', value: car?.side || 'N/A', icon: '🚗' },
    { label: 'Week starts', value: startOfWeek || 'N/A', icon: '📅' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back */}
      <Link to="/destinations" className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 text-sm font-medium mb-6">
        ← Back to Destinations
      </Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <img src={getDestinationImage(country.cca3)} alt={`${name} landscape`} className="w-full h-64 sm:h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <img src={flag} alt={`${name} flag`} className="absolute top-6 right-6 w-12 h-8 object-cover rounded shadow-lg border border-white/50" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-4">
            {coat && <img src={coat} alt="Coat of Arms" className="w-16 h-16 object-contain bg-white/20 backdrop-blur rounded-xl p-1" />}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">{name}</h1>
              {official && official !== name && (
                <p className="text-white/70 text-sm mt-1">{official}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick facts */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📋 Quick Facts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {infoItems.map(item => (
                <div key={item.label} className="p-3 rounded-xl bg-gray-50 dark:bg-dark-900">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Currencies & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">💰 Currencies</h3>
              <div className="flex flex-wrap gap-2">
                {currencies.map(c => (
                  <span key={c} className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm rounded-lg font-medium">{c}</span>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🗣️ Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map(l => (
                  <span key={l} className="px-3 py-1.5 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 text-sm rounded-lg font-medium">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Weather */}
          {latlng.length >= 2 && (
            <WeatherWidget lat={latlng[0]} lng={latlng[1]} cityName={capital} />
          )}

          {/* Borders */}
          {borders.length > 0 && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">🗺️ Neighboring Countries</h3>
              <div className="flex flex-wrap gap-2">
                {borders.map(b => (
                  <Link key={b} to={`/destinations/${b}`} className="px-3 py-1.5 bg-gray-100 dark:bg-dark-900 text-gray-600 dark:text-gray-300 text-sm rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-colors font-medium">
                    {b}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map */}
          {maps && (
            <a
              href={maps}
              target="_blank"
              rel="noreferrer"
              className="block bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-all text-center group"
            >
              <span className="text-4xl">🗺️</span>
              <p className="mt-2 font-semibold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">View on Google Maps</p>
              <p className="text-xs text-gray-400 mt-1">Opens in a new tab</p>
            </a>
          )}

          {/* Add to trip */}
          <Link
            to={`/trips/new?destination=${encodeURIComponent(name)}&code=${code}`}
            className="block bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <span className="text-3xl">✈️</span>
            <p className="text-white font-bold mt-2">Plan a Trip to {name}</p>
            <p className="text-white/70 text-sm mt-1">Create an itinerary & budget</p>
          </Link>

          {/* Coordinates */}
          {latlng.length >= 2 && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">📍 Coordinates</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{latlng[0].toFixed(4)}° N, {latlng[1].toFixed(4)}° E</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
