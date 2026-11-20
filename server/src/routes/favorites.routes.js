const express = require("express");
const {
  listFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favorite.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/", listFavorites);
router.post("/:recipeId", addFavorite);
router.delete("/:recipeId", removeFavorite);

module.exports = router;