import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyById, editProperty, clearSelectedProperty } from '../features/properties/propertiesSlice';
import PropertyForm from '../components/forms/PropertyForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function EditPropertyPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProperty, status } = useSelector(s => s.properties);
  const [loading, setLoading] = useState(false);

  useEffect(() => { dispatch(fetchPropertyById(id)); return () => dispatch(clearSelectedProperty()); }, [dispatch, id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(editProperty({ id: Number(id), data })).unwrap();
      navigate(`/properties/${id}`);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (status === 'loading' || !selectedProperty) return <LoadingSpinner text="Loading property..." />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Property</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Update the property details below.</p>
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700">
        <PropertyForm initialData={selectedProperty} onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
