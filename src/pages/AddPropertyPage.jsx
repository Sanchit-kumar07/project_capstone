import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProperty } from '../features/properties/propertiesSlice';
import PropertyForm from '../components/forms/PropertyForm';
import { useState } from 'react';

export default function AddPropertyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(addProperty(data)).unwrap();
      navigate('/properties');
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Property</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details to list a new property on NestQuest.</p>
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700">
        <PropertyForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
