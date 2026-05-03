import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-4 animate-float">🧭</div>
        <h1 className="font-display text-5xl font-extrabold gradient-text mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Lost in the wilderness</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
