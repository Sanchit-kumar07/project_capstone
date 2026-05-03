import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { formatPriceFull } from '../../utils/formatters';

const statusColors = {
  'For Sale': 'bg-emerald-500', 'For Rent': 'bg-sky-500', 'Sold': 'bg-rose-500', 'Pending': 'bg-amber-500',
};

const PropertyCard = memo(function PropertyCard({ property }) {
  const dispatch = useDispatch();
  const favIds = useSelector(s => s.favorites.ids);
  const isFav = favIds.includes(property.id);
  const [imgError, setImgError] = useState(false);

  const imageUrl = property.images?.[0] || 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <div className="group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-dark-700">
      <div className="relative overflow-hidden">
        <Link to={`/properties/${property.id}`}>
          {!imgError ? (
            <img 
              src={imageUrl} 
              alt={property.title}
              onError={() => setImgError(true)}
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" 
              loading="lazy" 
            />
          ) : (
            <div className="w-full h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center text-gray-500">
              <span>Image unavailable</span>
            </div>
          )}
        </Link>
        <div className="absolute top-3 left-3">
          <span className={`${statusColors[property.status] || 'bg-gray-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
            {property.status}
          </span>
        </div>
        <button onClick={() => dispatch(toggleFavorite(property.id))}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg
            ${isFav ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-gray-600 hover:bg-rose-500 hover:text-white'}`}>
          ♥
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/70 text-white text-lg font-bold px-4 py-1.5 rounded-xl backdrop-blur-sm">
            {formatPriceFull(property.price)}
          </span>
        </div>
      </div>
      <Link to={`/properties/${property.id}`} className="block p-5">
        <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-1">{property.type}</p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">{property.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">📍 {property.city}, {property.state}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-dark-700 pt-3">
          <span className="flex items-center gap-1">🛏 {property.beds} Beds</span>
          <span className="flex items-center gap-1">🚿 {property.baths} Baths</span>
          <span className="flex items-center gap-1">📐 {property.sqft.toLocaleString()} sqft</span>
        </div>
      </Link>
    </div>
  );
});

export default PropertyCard;
