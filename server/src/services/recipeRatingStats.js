const Recipe = require("../../models/Recipe");
const Review = require("../../models/Review");

async function refreshRecipeRatingStats(recipeId) {
  const emptyStats = { averageRating: 0, reviewCount: 0 };

  while (true) {
    const recipe = await Recipe.collection.findOne(
      { _id: recipeId },
      { projection: { reviewStatsVersion: 1 } }
    );
    if (!recipe) return emptyStats;

    const [summary] = await Review.aggregate([
      { $match: { recipeId, isHidden: { $ne: true } } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const stats = summary ? {
      averageRating: Math.round(summary.averageRating * 10) / 10,
      reviewCount: summary.reviewCount,
    } : emptyStats;

    // Retry if another request already refreshed the recipe's rating totals.
    const { matchedCount } = await Recipe.updateOne(
      { _id: recipeId, reviewStatsVersion: recipe.reviewStatsVersion ?? { $exists: false } },
      { $set: stats, $inc: { reviewStatsVersion: 1 } }
    );
    if (matchedCount) return stats;
  }
}

module.exports = { refreshRecipeRatingStats };
