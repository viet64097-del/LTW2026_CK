const express = require("express");
const {
  listPendingRecipes,
  updateRecipeStatus,
  listReviews,
  updateReviewVisibility,
  getTopRatedRecipes,
} = require("../controllers/admin.controller");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/recipes/pending", listPendingRecipes);
router.patch("/recipes/:id/status", updateRecipeStatus);
router.get("/reviews", listReviews);
router.patch("/reviews/:id/visibility", updateReviewVisibility);
router.get("/stats/top-recipes", getTopRatedRecipes);

module.exports = router;
