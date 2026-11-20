const express = require("express");
const {
  listMealPlans,
  addMealPlan,
  getShoppingList,
  deleteMealPlan
} = require("../controllers/mealPlan.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, listMealPlans);
router.post("/", requireAuth, addMealPlan);
router.get("/shopping-list", requireAuth, getShoppingList);
router.delete("/:id", requireAuth, deleteMealPlan);

module.exports = router;