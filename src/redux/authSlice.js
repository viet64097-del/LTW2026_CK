import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('current_user');
const savedToken = localStorage.getItem('access_token');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: !!savedUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    toggleFavoriteRecipe: (state, action) => {
      if (!state.user) return;
      const recipeId = action.payload;
      const favorites = state.user.favorites || [];
      const exists = favorites.includes(recipeId);

      if (exists) {
        state.user.favorites = favorites.filter((id) => id !== recipeId);
      } else {
        state.user.favorites.push(recipeId); // Immer tự xử lý bất biến (Immutability)
      }
    }
  }
});

export const { loginSuccess, logout, toggleFavoriteRecipe } = authSlice.actions;
export default authSlice.reducer;