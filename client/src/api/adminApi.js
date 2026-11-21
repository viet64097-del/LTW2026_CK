import axiosClient from './axiosClient';

export const adminApi = {
  updateRecipeStatus: (id, status) => axiosClient.patch(`/admin/recipes/${id}/status`, { status }),
  getCategories: () => axiosClient.get('/categories'),
  createCategory: (name) => axiosClient.post('/admin/categories', { name }),
  updateCategory: (id, name) => axiosClient.put(`/admin/categories/${id}`, { name }),
  deleteCategory: (id) => axiosClient.delete(`/admin/categories/${id}`),
  toggleReviewHidden: (reviewId) => axiosClient.patch(`/admin/reviews/${reviewId}/toggle-hide`),
  getTopRatedRecipes: () => axiosClient.get('/admin/stats/top-rated')
};