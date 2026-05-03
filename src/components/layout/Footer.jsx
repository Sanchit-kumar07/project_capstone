import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-dark-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧭</span>
              <span className="font-display text-xl font-bold text-white">WanderPlan</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Search destinations, build day-by-day itineraries, and manage your travel budgets — all in one place.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/destinations" className="hover:text-primary-400 transition-colors">Destinations</Link>
              <Link to="/trips" className="hover:text-primary-400 transition-colors">My Trips</Link>
              <Link to="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</Link>
            </div>
          </div>
          {/* APIs */}
          <div>
            <h4 className="text-white font-semibold mb-3">Powered By</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://restcountries.com" target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors">REST Countries API</a>
              <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors">Open-Meteo API</a>
              <a href="https://frankfurter.app" target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors">Frankfurter API</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WanderPlan. Capstone Project — Built with React, Redux Toolkit & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
