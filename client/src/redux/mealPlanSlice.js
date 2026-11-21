import { createSlice } from '@reduxjs/toolkit';

export const DAYS = [
  { key: 'mon', label: 'Thứ 2' },
  { key: 'tue', label: 'Thứ 3' },
  { key: 'wed', label: 'Thứ 4' },
  { key: 'thu', label: 'Thứ 5' },
  { key: 'fri', label: 'Thứ 6' },
  { key: 'sat', label: 'Thứ 7' },
  { key: 'sun', label: 'Chủ nhật' }
];

export const MEAL_TYPES = [
  { key: 'breakfast', label: '☀️ Bữa Sáng' },
  { key: 'lunch', label: '🌤️ Bữa Trưa' },
  { key: 'dinner', label: '🌙 Bữa Tối' }
];

const createEmptyPlan = () => {
  const plan = {};
  DAYS.forEach((d) => {
    plan[d.key] = { breakfast: null, lunch: null, dinner: null };
  });
  return plan;
};

const loadSavedPlan = () => {
  try {
    const saved = localStorage.getItem('mealPlan');
    return saved ? JSON.parse(saved) : createEmptyPlan();
  } catch {
    return createEmptyPlan();
  }
};

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: {
    plan: loadSavedPlan()
  },
  reducers: {
    setMeal: (state, action) => {
      const { day, mealType, recipe } = action.payload;
      if (state.plan[day]) {
        state.plan[day][mealType] = recipe;
      }
    },
    removeMeal: (state, action) => {
      const { day, mealType } = action.payload;
      if (state.plan[day]) {
        state.plan[day][mealType] = null;
      }
    },
    clearMealPlan: (state) => {
      state.plan = createEmptyPlan();
    }
  }
});

export const { setMeal, removeMeal, clearMealPlan } = mealPlanSlice.actions;
export const selectGroceryList = (state) => {
  const plan = state.mealPlan.plan || {};

  const allIngredients = [];
  Object.values(plan).forEach((dayMeals) => {
    Object.values(dayMeals).forEach((recipe) => {
      if (recipe && Array.isArray(recipe.ingredients)) {
        allIngredients.push(...recipe.ingredients);
      }
    });
  });

  const grouped = allIngredients.reduce((acc, item) => {
    const cleanName = (item.name || '').trim().toLowerCase();
    const cleanUnit = (item.unit || '').trim().toLowerCase();
    const key = `${cleanName}__${cleanUnit}`;

    if (!acc[key]) {
      acc[key] = {
        key,
        name: cleanName,
        unit: item.unit,
        quantity: Number(item.quantity) || 0
      };
    } else {
      acc[key].quantity += Number(item.quantity) || 0;
    }
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name, 'vi'));
};
export default mealPlanSlice.reducer;