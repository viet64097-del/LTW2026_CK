import { createSlice } from '@reduxjs/toolkit';

function restoreSession() {
  try {
    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('current_user'));

    if (user?._id && token && !token.startsWith('mock_jwt_token_')) {
      return { user, token, isAuthenticated: true };
    }
  } catch {
    // An unreadable saved session can be replaced by signing in again.
  }

  return { user: null, token: null, isAuthenticated: false };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: restoreSession(),
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = { ...user, _id: user.id ?? user._id, favorites: user.favorites ?? [] };
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
        state.user.favorites = [...favorites, recipeId];
      }
    }
  }
});

export const { loginSuccess, logout, toggleFavoriteRecipe } = authSlice.actions;
export default authSlice.reducer;
