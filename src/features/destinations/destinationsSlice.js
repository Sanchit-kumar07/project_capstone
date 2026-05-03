import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/countriesApi';

export const fetchAllCountries = createAsyncThunk(
  'destinations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllCountries();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch countries');
    }
  }
);

export const fetchCountryByCode = createAsyncThunk(
  'destinations/fetchByCode',
  async (code, { rejectWithValue }) => {
    try {
      return await api.getCountryByCode(code);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Country not found');
    }
  }
);

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: {
    countries: [],
    selectedCountry: null,
    filters: {
      search: '',
      region: '',
      sortBy: 'name-asc',
    },
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = { search: '', region: '', sortBy: 'name-asc' };
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCountryByCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryByCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCountry = action.payload;
      })
      .addCase(fetchCountryByCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setPage, clearSelectedCountry } = destinationsSlice.actions;
export default destinationsSlice.reducer;
