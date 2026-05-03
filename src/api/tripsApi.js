import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Trips CRUD
export const getTrips = async () => {
  const { data } = await API.get('/trips');
  return data;
};

export const getTripById = async (id) => {
  const { data } = await API.get(`/trips/${id}`);
  return data;
};

export const createTrip = async (trip) => {
  const { data } = await API.post('/trips', {
    ...trip,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  });
  return data;
};

export const updateTrip = async (id, updates) => {
  const { data } = await API.patch(`/trips/${id}`, updates);
  return data;
};

export const deleteTrip = async (id) => {
  await API.delete(`/trips/${id}`);
  return id;
};

// Itinerary Items
export const getItineraryItems = async (tripId) => {
  const { data } = await API.get(`/itineraryItems?tripId=${tripId}`);
  return data;
};

export const addItineraryItem = async (item) => {
  const { data } = await API.post('/itineraryItems', {
    ...item,
    id: 'i' + Date.now(),
    completed: false,
  });
  return data;
};

export const updateItineraryItem = async (id, updates) => {
  const { data } = await API.patch(`/itineraryItems/${id}`, updates);
  return data;
};

export const deleteItineraryItem = async (id) => {
  await API.delete(`/itineraryItems/${id}`);
  return id;
};

// Expenses
export const getExpenses = async (tripId) => {
  const { data } = await API.get(`/expenses?tripId=${tripId}`);
  return data;
};

export const addExpense = async (expense) => {
  const { data } = await API.post('/expenses', {
    ...expense,
    id: 'e' + Date.now(),
  });
  return data;
};

export const updateExpense = async (id, updates) => {
  const { data } = await API.patch(`/expenses/${id}`, updates);
  return data;
};

export const deleteExpense = async (id) => {
  await API.delete(`/expenses/${id}`);
  return id;
};
