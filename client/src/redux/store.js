import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

store.subscribe(() => {
  const { user, token } = store.getState().auth;
  try {
    if (user && token) {
      localStorage.setItem('current_user', JSON.stringify(user));
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('current_user');
      localStorage.removeItem('access_token');
    }
  } catch {
    // Keep the current in-memory session when browser storage is unavailable.
  }
});
