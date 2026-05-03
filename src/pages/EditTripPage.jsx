import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripById, updateTrip, clearSelectedTrip } from '../features/trips/tripsSlice';
import TripForm from '../components/forms/TripForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function EditTripPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTrip: trip, status } = useSelector(s => s.trips);

  useEffect(() => {
    dispatch(fetchTripById(id));
    return () => dispatch(clearSelectedTrip());
  }, [id, dispatch]);

  const handleSubmit = (data) => {
    dispatch(updateTrip({ id, updates: data })).then(() => navigate(`/trips/${id}`));
  };

  if (status === 'loading' || !trip) return <LoadingSpinner size="lg" text="Loading trip..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        ✏️ Edit Trip
      </h1>
      <TripForm initialData={trip} onSubmit={handleSubmit} isEdit />
    </div>
  );
}
