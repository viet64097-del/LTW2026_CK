const express = require("express");

const {
  listRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchByIngredients,
} = require("../controllers/recipe.controller");

const {
  listReviews,
  createReview,
} = require("../controllers/review.controller");

const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/search/ingredients", searchByIngredients);
router.get("/", listRecipes);

router.post("/", requireAuth, createRecipe);

router.get("/:id/reviews", listReviews);
router.post("/:id/reviews", requireAuth, createReview);

router.get("/:id", getRecipe);
router.patch("/:id", requireAuth, updateRecipe);
router.delete("/:id", requireAuth, deleteRecipe);

module.exports = router;