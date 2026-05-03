import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as tripsApi from '../../api/tripsApi';
import * as currencyApi from '../../api/currencyApi';

export const fetchExpenses = createAsyncThunk('budget/fetchExpenses', async (tripId, { rejectWithValue }) => {
  try { return await tripsApi.getExpenses(tripId); } catch (err) { return rejectWithValue(err.message); }
});

export const addExpense = createAsyncThunk('budget/addExpense', async (expense, { rejectWithValue }) => {
  try { return await tripsApi.addExpense(expense); } catch (err) { return rejectWithValue(err.message); }
});

export const updateExpense = createAsyncThunk('budget/updateExpense', async ({ id, updates }, { rejectWithValue }) => {
  try { return await tripsApi.updateExpense(id, updates); } catch (err) { return rejectWithValue(err.message); }
});

export const deleteExpense = createAsyncThunk('budget/deleteExpense', async (id, { rejectWithValue }) => {
  try { return await tripsApi.deleteExpense(id); } catch (err) { return rejectWithValue(err.message); }
});

export const fetchExchangeRates = createAsyncThunk('budget/fetchRates', async (baseCurrency, { rejectWithValue }) => {
  try { return await currencyApi.getExchangeRates(baseCurrency); } catch (err) { return rejectWithValue(err.message); }
});

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    expenses: [],
    exchangeRates: null,
    baseCurrency: 'USD',
    status: 'idle',
    error: null,
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    clearExpenses: (state) => {
      state.expenses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchExpenses.fulfilled, (state, action) => { state.status = 'succeeded'; state.expenses = action.payload; })
      .addCase(fetchExpenses.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(addExpense.fulfilled, (state, action) => { state.expenses.push(action.payload); })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.expenses.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.expenses[idx] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(e => e.id !== action.payload);
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.exchangeRates = action.payload;
      });
  },
});

export const { setBaseCurrency, clearExpenses } = budgetSlice.actions;
export default budgetSlice.reducer;
