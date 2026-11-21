import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealPlanReducer from './mealPlanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mealPlan: mealPlanReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('auth', JSON.stringify(state.auth));
  localStorage.setItem('mealPlan', JSON.stringify(state.mealPlan.plan));
});