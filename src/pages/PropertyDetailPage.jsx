import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyById, removeProperty, clearSelectedProperty } from '../features/properties/propertiesSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { formatPriceFull, formatNumber } from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Modal from '../components/ui/Modal';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProperty: p, status } = useSelector(s => s.properties);
  const favIds = useSelector(s => s.favorites.ids);
  const [activeImg, setActiveImg] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => { dispatch(fetchPropertyById(id)); return () => dispatch(clearSelectedProperty()); }, [dispatch, id]);

  if (status === 'loading' || !p) return <LoadingSpinner text="Loading property details..." />;

  const isFav = favIds.includes(p.id);
  const handleDelete = async () => {
    await dispatch(removeProperty(p.id));
    navigate('/properties');
  };

  const handleImgError = (idx) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  const getImageUrl = (idx) => {
    return p.images?.[idx] || 'https://via.placeholder.com/800x600?text=No+Image';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/properties" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors">← Back to Properties</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {!imgErrors[activeImg] ? (
              <img 
                src={getImageUrl(activeImg)} 
                alt={p.title} 
                onError={() => handleImgError(activeImg)}
                className="w-full h-[400px] object-cover" 
              />
            ) : (
              <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center text-gray-500">
                Image unavailable
              </div>
            )}
            {p.images?.length > 1 && (
              <div className="flex gap-2 p-3 bg-white dark:bg-dark-800">
                {p.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-primary-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    {!imgErrors[i] ? (
                      <img 
                        src={img} 
                        alt="" 
                        onError={() => handleImgError(i)}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-dark-600 flex items-center justify-center text-xs text-gray-500">
                        No img
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{p.type} • {p.status}</span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{p.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">📍 {p.address}, {p.city}, {p.state} {p.zipCode}</p>
              </div>
              <p className="text-3xl font-black text-primary-600">{formatPriceFull(p.price)}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 dark:border-dark-700">
              <div className="text-center"><p className="text-xl font-bold text-gray-900 dark:text-white">{p.beds}</p><p className="text-xs text-gray-500">Bedrooms</p></div>
              <div className="text-center"><p className="text-xl font-bold text-gray-900 dark:text-white">{p.baths}</p><p className="text-xs text-gray-500">Bathrooms</p></div>
              <div className="text-center"><p className="text-xl font-bold text-gray-900 dark:text-white">{formatNumber(p.sqft)}</p><p className="text-xs text-gray-500">Sq Ft</p></div>
              <div className="text-center"><p className="text-xl font-bold text-gray-900 dark:text-white">{p.yearBuilt || 'N/A'}</p><p className="text-xs text-gray-500">Year Built</p></div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{p.description}</p>
            </div>

            {p.features?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Features & Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {p.features.map(f => (
                    <span key={f} className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700 space-y-3">
            <button onClick={() => dispatch(toggleFavorite(p.id))}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${isFav ? 'bg-rose-500 text-white' : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}>
              {isFav ? '♥ Saved to Favorites' : '♡ Save to Favorites'}
            </button>
            <Link to={`/properties/${p.id}/edit`} className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center font-bold text-sm rounded-xl transition-colors">
              ✏️ Edit Property
            </Link>
            <button onClick={() => setShowDelete(true)} className="w-full py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-bold text-sm rounded-xl transition-colors">
              🗑 Delete Property
            </button>
          </div>

          {/* Agent */}
          {p.agent && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Listed By</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {p.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{p.agent.name}</p>
                  <p className="text-xs text-gray-500">{p.agent.phone}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{p.agent.email}</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Property">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this property? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setShowDelete(false)} className="flex-1 py-3 bg-gray-100 dark:bg-dark-700 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300">Cancel</button>
          <button onClick={handleDelete} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
