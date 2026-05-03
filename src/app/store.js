import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from '../features/destinations/destinationsSlice';
import tripsReducer from '../features/trips/tripsSlice';
import budgetReducer from '../features/budget/budgetSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    trips: tripsReducer,
    budget: budgetReducer,
    theme: themeReducer,
  },
});
