import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/tripsApi';

export const fetchTrips = createAsyncThunk('trips/fetchAll', async (_, { rejectWithValue }) => {
  try { return await api.getTrips(); } catch (err) { return rejectWithValue(err.message); }
});

export const fetchTripById = createAsyncThunk('trips/fetchById', async (id, { rejectWithValue }) => {
  try { return await api.getTripById(id); } catch (err) { return rejectWithValue(err.message); }
});

export const createTrip = createAsyncThunk('trips/create', async (trip, { rejectWithValue }) => {
  try { return await api.createTrip(trip); } catch (err) { return rejectWithValue(err.message); }
});

export const updateTrip = createAsyncThunk('trips/update', async ({ id, updates }, { rejectWithValue }) => {
  try { return await api.updateTrip(id, updates); } catch (err) { return rejectWithValue(err.message); }
});

export const deleteTrip = createAsyncThunk('trips/delete', async (id, { rejectWithValue }) => {
  try { return await api.deleteTrip(id); } catch (err) { return rejectWithValue(err.message); }
});

export const fetchItineraryItems = createAsyncThunk('trips/fetchItinerary', async (tripId, { rejectWithValue }) => {
  try { return await api.getItineraryItems(tripId); } catch (err) { return rejectWithValue(err.message); }
});

export const addItineraryItem = createAsyncThunk('trips/addItineraryItem', async (item, { rejectWithValue }) => {
  try { return await api.addItineraryItem(item); } catch (err) { return rejectWithValue(err.message); }
});

export const updateItineraryItem = createAsyncThunk('trips/updateItineraryItem', async ({ id, updates }, { rejectWithValue }) => {
  try { return await api.updateItineraryItem(id, updates); } catch (err) { return rejectWithValue(err.message); }
});

export const deleteItineraryItem = createAsyncThunk('trips/deleteItineraryItem', async (id, { rejectWithValue }) => {
  try { return await api.deleteItineraryItem(id); } catch (err) { return rejectWithValue(err.message); }
});

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    selectedTrip: null,
    itineraryItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedTrip: (state) => {
      state.selectedTrip = null;
      state.itineraryItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTrips.fulfilled, (state, action) => { state.status = 'succeeded'; state.trips = action.payload; })
      .addCase(fetchTrips.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchTripById.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTripById.fulfilled, (state, action) => { state.status = 'succeeded'; state.selectedTrip = action.payload; })
      .addCase(fetchTripById.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(createTrip.fulfilled, (state, action) => { state.trips.push(action.payload); })
      .addCase(updateTrip.fulfilled, (state, action) => {
        const idx = state.trips.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.trips[idx] = action.payload;
        if (state.selectedTrip?.id === action.payload.id) state.selectedTrip = action.payload;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter(t => t.id !== action.payload);
      })
      .addCase(fetchItineraryItems.fulfilled, (state, action) => { state.itineraryItems = action.payload; })
      .addCase(addItineraryItem.fulfilled, (state, action) => { state.itineraryItems.push(action.payload); })
      .addCase(updateItineraryItem.fulfilled, (state, action) => {
        const idx = state.itineraryItems.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.itineraryItems[idx] = action.payload;
      })
      .addCase(deleteItineraryItem.fulfilled, (state, action) => {
        state.itineraryItems = state.itineraryItems.filter(i => i.id !== action.payload);
      });
  },
});

export const { clearSelectedTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
