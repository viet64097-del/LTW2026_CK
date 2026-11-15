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
      localStorage.setItem('current_user', JSON.stringify(user));
      localStorage.setItem('access_token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('current_user');
      localStorage.removeItem('access_token');
    },
    toggleFavoriteRecipe: (state, action) => {
      if (!state.user) return;
      const recipeId = action.payload;
      const favorites = state.user.favorites || [];
      const exists = favorites.includes(recipeId);

      if (exists) {
        state.user.favorites = favorites.filter((id) => id !== recipeId);
      } else {
        state.user.favorites = [...favorites, recipeId];
      }
      localStorage.setItem('current_user', JSON.stringify(state.user));
    }
  }
});

export const { loginSuccess, logout, toggleFavoriteRecipe } = authSlice.actions;
export default authSlice.reducer;