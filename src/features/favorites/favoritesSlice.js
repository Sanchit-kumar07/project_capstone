import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('nestquest_favorites') || '[]');

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: saved },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) { state.ids = state.ids.filter(i => i !== id); }
      else { state.ids.push(id); }
      localStorage.setItem('nestquest_favorites', JSON.stringify(state.ids));
    },
    clearFavorites: (state) => { state.ids = []; localStorage.removeItem('nestquest_favorites'); },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
