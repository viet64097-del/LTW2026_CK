const express = require("express");
const {
    listRecipes,
    getRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router;

router.get("/",listRecipes);
router.get("/:id",getRecipe);

module.exports = router;