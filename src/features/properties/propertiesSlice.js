import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/propertyApi';

export const fetchProperties = createAsyncThunk('properties/fetchAll', async (params, { rejectWithValue }) => {
  try { return await api.getProperties(params); } catch (e) { return rejectWithValue(e.response?.data || e.message); }
});
export const fetchPropertyById = createAsyncThunk('properties/fetchById', async (id, { rejectWithValue }) => {
  try { return await api.getPropertyById(id); } catch (e) { return rejectWithValue(e.response?.data || e.message); }
});
export const addProperty = createAsyncThunk('properties/add', async (data, { rejectWithValue }) => {
  try { return await api.createProperty(data); } catch (e) { return rejectWithValue(e.response?.data || e.message); }
});
export const editProperty = createAsyncThunk('properties/edit', async ({ id, data }, { rejectWithValue }) => {
  try { return await api.updateProperty(id, data); } catch (e) { return rejectWithValue(e.response?.data || e.message); }
});
export const removeProperty = createAsyncThunk('properties/remove', async (id, { rejectWithValue }) => {
  try { await api.deleteProperty(id); return id; } catch (e) { return rejectWithValue(e.response?.data || e.message); }
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [], selectedProperty: null, status: 'idle', error: null,
    filters: { search: '', type: '', city: '', status: '', minBeds: '', minPrice: '', maxPrice: '', sortBy: '' },
    currentPage: 1, totalPages: 1, totalItems: 0,
  },
  reducers: {
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; state.currentPage = 1; },
    clearFilters: (state) => { state.filters = { search: '', type: '', city: '', status: '', minBeds: '', minPrice: '', maxPrice: '', sortBy: '' }; state.currentPage = 1; },
    setPage: (state, action) => { state.currentPage = action.payload; },
    clearSelectedProperty: (state) => { state.selectedProperty = null; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchProperties.fulfilled, (s, a) => {
        s.status = 'succeeded';
        if (a.payload.data) {
          s.items = a.payload.data; s.totalItems = a.payload.items;
          s.totalPages = a.payload.pages || Math.ceil(a.payload.items / 9);
        } else { s.items = a.payload; s.totalItems = a.payload.length; s.totalPages = 1; }
      })
      .addCase(fetchProperties.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })
      .addCase(fetchPropertyById.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchPropertyById.fulfilled, (s, a) => { s.status = 'succeeded'; s.selectedProperty = a.payload; })
      .addCase(fetchPropertyById.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })
      .addCase(addProperty.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(editProperty.fulfilled, (s, a) => { const i = s.items.findIndex(p => p.id === a.payload.id); if (i !== -1) s.items[i] = a.payload; if (s.selectedProperty?.id === a.payload.id) s.selectedProperty = a.payload; })
      .addCase(removeProperty.fulfilled, (s, a) => { s.items = s.items.filter(p => p.id !== a.payload); });
  },
});

export const { setFilters, clearFilters, setPage, clearSelectedProperty, clearError } = propertiesSlice.actions;
export default propertiesSlice.reducer;
