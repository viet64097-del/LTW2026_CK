const express = require("express");
const {
  listMealPlans,
  addMealPlan,
} = require("../controllers/mealPlan.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, listMealPlans);
router.post("/", requireAuth, addMealPlan);

module.exports = router;