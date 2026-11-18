const MealPlan = require("../../models/MealPlan");
const Recipe = require("../../models/Recipe");

const mealTypes = ["breakfast", "lunch", "dinner"];

function parseDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (date.toISOString().slice(0, 10) !== value) {
    return null;
  }

  return date;
}

exports.listMealPlans = async (req, res, next) => {
  try {
    const startDate = parseDateOnly(req.query.weekStart);

    if (!startDate) {
      return res.status(400).json({
        message: "weekStart phải có định dạng YYYY-MM-DD",
      });
    }

    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 7);

    const mealPlans = await MealPlan.find({
      userId: req.user.id,
      date: { $gte: startDate, $lt: endDate },
    })
      .populate("recipeId", "title imageUrl cookingTime ingredient")
      .sort({ date: 1, mealType: 1 });

    res.json({ data: mealPlans });
  } catch (error) {
    next(error);
  }
};

exports.addMealPlan = async (req, res, next) => {
  try {
    const { recipeId, date, mealType } = req.body;
    const parsedDate = parseDateOnly(date);

    if (!recipeId || !parsedDate || !mealTypes.includes(mealType)) {
      return res.status(400).json({
        message: "Cần có recipeId, ngày hợp lệ và bữa ăn hợp lệ",
      });
    }

    const recipe = await Recipe.findOne({
      _id: recipeId,
      status: "approved",
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Không tìm thấy công thức đã được duyệt",
      });
    }

    const mealPlan = await MealPlan.create({
      userId: req.user.id,
      recipeId,
      date: parsedDate,
      mealType,
    });

    res.status(201).json({
      message: "Đã thêm món vào thực đơn",
      data: mealPlan,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Món này đã có trong bữa đó",
      });
    }

    next(error);
  }
};