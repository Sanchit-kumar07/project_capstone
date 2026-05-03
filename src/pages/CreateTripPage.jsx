import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTrip } from '../features/trips/tripsSlice';
import TripForm from '../components/forms/TripForm';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const initialData = {
    destination: searchParams.get('destination') || '',
    countryCode: searchParams.get('code') || '',
  };

  const handleSubmit = (data) => {
    dispatch(createTrip(data)).then((action) => {
      if (action.payload?.id) navigate(`/trips/${action.payload.id}`);
      else navigate('/trips');
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        ✈️ Create a New Trip
      </h1>
      <TripForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
