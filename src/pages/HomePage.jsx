import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCountries } from '../features/destinations/destinationsSlice';
import { fetchTrips } from '../features/trips/tripsSlice';
import DestinationCard from '../components/destinations/DestinationCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const { countries, status } = useSelector(s => s.destinations);
  const { trips } = useSelector(s => s.trips);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllCountries());
    dispatch(fetchTrips());
  }, [dispatch, status]);

  const featuredCountries = useMemo(() => {
    const popular = ['FRA', 'JPN', 'ITA', 'THA', 'GRC', 'ESP', 'AUS', 'BRA'];
    return countries
      .filter(c => popular.includes(c.cca3))
      .slice(0, 4);
  }, [countries]);

  const stats = [
    { value: '250+', label: 'Destinations', icon: '🌍' },
    { value: trips.length || '4', label: 'Trips Planned', icon: '✈️' },
    { value: '30+', label: 'Currencies', icon: '💱' },
    { value: '7-Day', label: 'Forecasts', icon: '🌤️' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 8s ease infinite' }} />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float">✈️</div>
          <div className="absolute top-20 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌍</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🧭</div>
          <div className="absolute bottom-10 right-1/3 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🏖️</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Plan Your Dream
            <span className="block text-yellow-300">Adventure</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Search destinations, build day-by-day itineraries, and manage your travel budgets — all in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/destinations"
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-lg"
              id="explore-destinations-btn"
            >
              🌍 Explore Destinations
            </Link>
            <Link
              to="/trips/new"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-2xl hover:bg-white/30 transition-all border border-white/30 text-lg"
              id="plan-trip-btn"
            >
              ✈️ Plan a Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4">
        <div className="glass rounded-2xl p-6 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <span className="text-3xl">{s.icon}</span>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-800 dark:text-white">
            Popular Destinations
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Discover the world's most visited countries</p>
        </div>
        {status === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCountries.map(c => (
              <DestinationCard key={c.cca3} country={c} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
          >
            View All Destinations →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-dark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Discover', desc: 'Search 250+ countries, check weather forecasts, and explore destination details.' },
              { step: '02', icon: '📋', title: 'Plan', desc: 'Create trips, build day-by-day itineraries, and organize your activities.' },
              { step: '03', icon: '💰', title: 'Budget', desc: 'Track expenses, convert currencies, and stay on top of your travel budget.' },
            ].map(item => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-dark-800 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-primary-500 mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Start Planning?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Create your first trip and start building the perfect itinerary for your next adventure.</p>
          <Link
            to="/trips/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl text-lg"
          >
            🚀 Create Your First Trip
          </Link>
        </div>
      </section>
    </div>
  );
}
