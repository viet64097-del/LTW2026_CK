import axiosClient from './axiosClient';

export const recipeApi = {
  getAll: (params) => axiosClient.get('/recipes', { params }),
  getById: (id) => axiosClient.get(`/recipes/${id}`),
  searchByIngredients: (ingredients) =>
    axiosClient.post('/recipes/search-by-ingredients', { ingredients }),
  create: (formData) =>
    axiosClient.post('/recipes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (id, formData) =>
    axiosClient.put(`/recipes/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  remove: (id) => axiosClient.delete(`/recipes/${id}`),
  addReview: (recipeId, data) => axiosClient.post(`/recipes/${recipeId}/reviews`, data)
};