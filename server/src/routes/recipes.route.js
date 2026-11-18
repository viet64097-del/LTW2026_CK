const express = require("express");
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");

const {
  listRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchByIngredients,
  uploadRecipeImage,
} = require("../controllers/recipe.controller");

const {
  listReviews,
  createReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.get("/search/ingredients", searchByIngredients);
router.post("/upload-image", requireAuth, upload.single("image"), uploadRecipeImage);

router.get("/", listRecipes);
router.post("/", requireAuth, createRecipe);

router.get("/:id/reviews", listReviews);
router.post("/:id/reviews", requireAuth, createReview);

router.get("/:id", getRecipe);
router.patch("/:id", requireAuth, updateRecipe);
router.delete("/:id", requireAuth, deleteRecipe);

module.exports = router;