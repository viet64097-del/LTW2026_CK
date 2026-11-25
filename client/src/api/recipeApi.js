import axiosClient from './axiosClient';

export const recipeApi = {
  getAll: (params) => axiosClient.get('/recipes', { params }),
  getById: (id) => axiosClient.get(`/recipes/${id}`),
  searchByIngredients: (ingredients) =>
    axiosClient.get('/recipes/search/ingredients', {
      params: { ingredients: Array.isArray(ingredients) ? ingredients.join(',') : ingredients }
    }),
  create: (data) => axiosClient.post('/recipes', data),
  update: (id, data) => axiosClient.patch(`/recipes/${id}`, data),
  remove: (id) => axiosClient.delete(`/recipes/${id}`),
  addReview: (recipeId, data) => axiosClient.post(`/recipes/${recipeId}/reviews`, data)
};
