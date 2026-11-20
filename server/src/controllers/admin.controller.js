const Recipe = require("../../models/Recipe");
const Review = require("../../models/Review");

exports.listPendingRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ status: "pending" })
      .populate("authorId", "name email")
      .populate("categoryId", "name")
      .sort({ createdAt: 1 });

    res.json({ data: recipes });
  } catch (error) {
    next(error);
  }
};

exports.updateRecipeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["approved", "hidden"].includes(status)) {
      return res.status(400).json({
        message: "status chỉ được là approved hoặc hidden",
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Không tìm thấy công thức" });
    }

    res.json({ message: "Đã cập nhật trạng thái", data: recipe });
  } catch (error) {
    next(error);
  }
};

exports.getTopRatedRecipes = async (req, res, next) => {
  try {
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 10, 1),
      50
    );

    const recipes = await Review.aggregate([
      { $match: { isHidden: { $ne: true } } },
      {
        $group: {
          _id: "$recipeId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "recipes",
          localField: "_id",
          foreignField: "_id",
          as: "recipe",
        },
      },
      { $unwind: "$recipe" },
      { $match: { "recipe.status": "approved" } },
      { $sort: { averageRating: -1, reviewCount: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          recipeId: "$_id",
          title: "$recipe.title",
          imageUrl: "$recipe.imageUrl",
          averageRating: { $round: ["$averageRating", 1] },
          reviewCount: 1,
        },
      },
    ]);

    res.json({ data: recipes });
  } catch (error) {
    next(error);
  }
};