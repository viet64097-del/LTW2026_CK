import axiosClient from './axiosClient';

export const adminApi = {
  updateRecipeStatus: (id, status) => axiosClient.patch(`/admin/recipes/${id}/status`, { status }),
  getCategories: () => axiosClient.get('/categories'),
  createCategory: (name) => axiosClient.post('/categories', { name }),
  updateCategory: (id, name) => axiosClient.patch(`/categories/${id}`, { name }),
  deleteCategory: (id) => axiosClient.delete(`/categories/${id}`),
  getReviews: (signal) => axiosClient.get('/admin/reviews', { signal }),
  setReviewVisibility: (reviewId, isHidden) =>
    axiosClient.patch(`/admin/reviews/${reviewId}/visibility`, { isHidden }),
  getTopRatedRecipes: () => axiosClient.get('/admin/stats/top-recipes')
};
