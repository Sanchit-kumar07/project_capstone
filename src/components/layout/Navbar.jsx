import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';
import { useState } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { mode } = useSelector(s => s.theme);
  const { trips } = useSelector(s => s.trips);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/destinations', label: '🌍 Destinations' },
    { to: '/trips', label: '✈️ My Trips', badge: trips.length || null },
    { to: '/dashboard', label: '📊 Dashboard' },
  ];

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-primary-500'
    }`;

  return (
    <nav className="sticky top-0 z-40 glass border-b border-gray-200/50 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-float">🧭</span>
            <span className="font-display text-xl font-bold gradient-text">WanderPlan</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 w-5 h-5 flex items-center justify-center bg-secondary-500 text-white text-xs rounded-full">
                      {link.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-all duration-300"
              title="Toggle dark mode"
              id="theme-toggle"
            >
              <span className="text-xl transition-transform duration-300 hover:rotate-180">
                {mode === 'dark' ? '☀️' : '🌙'}
              </span>
            </button>
            <Link
              to="/trips/new"
              className="hidden sm:flex items-center gap-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
              id="create-trip-btn"
            >
              + New Trip
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800"
            >
              <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/trips/new"
                className="mt-2 flex items-center justify-center gap-1 px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-xl"
                onClick={() => setMenuOpen(false)}
              >
                + New Trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
