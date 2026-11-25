import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealPlanReducer from './mealPlanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mealPlan: mealPlanReducer
  }
});

let previous = store.getState();
store.subscribe(() => {
  const state = store.getState();
  try {
    if (state.auth !== previous.auth) {
      localStorage.setItem('auth', JSON.stringify(state.auth));
    }
    if (state.mealPlan.plan !== previous.mealPlan.plan) {
      localStorage.setItem('mealPlan', JSON.stringify(state.mealPlan.plan));
    }
  } catch {
    // Keep the current session and plan usable when browser storage is unavailable.
  }
  previous = state;
});
