import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/guest/LoginPage';
import RegisterPage from './pages/guest/RegisterPage';
import HomePage from './pages/guest/HomePage';
import SearchByIngredientPage from './pages/guest/SearchByIngredientPage';
import RecipeDetailPage from './pages/guest/RecipeDetailPage';
import RecipeFormPage from './pages/member/RecipeFormPage';
import MyRecipesPage from './pages/member/MyRecipesPage';
import MealPlannerPage from './pages/member/MealPlannerPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import NotFoundPage from './pages/guest/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search-ingredients" element={<SearchByIngredientPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />

        <Route element={<ProtectedRoute allowedRoles={['member', 'admin']} />}>
          <Route path="/recipes/create" element={<RecipeFormPage />} />
          <Route path="/recipes/edit/:id" element={<RecipeFormPage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/meal-planner" element={<MealPlannerPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/approve" element={<AdminDashboardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
