const Recipe = require("../../models/Recipe");
const Review = require("../../models/Review");
const { refreshRecipeRatingStats } = require("../services/recipeRatingStats");

exports.listReviews = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      status: "approved",
    });

    if (!recipe) {
      return res.status(404).json({ message: "Không tìm thấy công thức" });
    }

    const reviews = await Review.find({
      recipeId: recipe._id,
      isHidden: { $ne: true },
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body ?? {};
    const numericRating = typeof rating === "number" || typeof rating === "string"
      ? Number(rating)
      : NaN;

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        message: "Điểm đánh giá phải là số nguyên từ 1 đến 5",
      });
    }

    const recipe = await Recipe.findOne({
      _id: req.params.id,
      status: "approved",
    });

    if (!recipe) {
      return res.status(404).json({ message: "Không tìm thấy công thức" });
    }

    const review = await Review.create({
      recipeId: recipe._id,
      userId: req.user.id,
      rating: numericRating,
      comment: typeof comment === "string" ? comment.trim() : "",
    });

    const stats = await refreshRecipeRatingStats(recipe._id);

    res.status(201).json({
      message: "Đã gửi đánh giá",
      data: review,
      ...stats,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Bạn đã đánh giá công thức này rồi",
      });
    }

    next(error);
  }
};
