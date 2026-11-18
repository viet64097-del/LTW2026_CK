const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

const favoritesToPopulate = {
  path: "favorites",
  match: { status: "approved" },
  select: "title imageUrl cookingTime difficulty averageRating reviewCount",
};

exports.listFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(favoritesToPopulate);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    res.json({ data: user.favorites });
  } catch (error) {
    next(error);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.recipeId,
      status: "approved",
    });

    if (!recipe) {
      return res.status(404).json({ message: "Không tìm thấy công thức đã duyệt" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: recipe._id } },
      { new: true }
    ).populate(favoritesToPopulate);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    res.json({ message: "Đã thêm vào yêu thích", data: user.favorites });
  } catch (error) {
    next(error);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: req.params.recipeId } },
      { new: true }
    ).populate(favoritesToPopulate);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    res.json({ message: "Đã bỏ khỏi yêu thích", data: user.favorites });
  } catch (error) {
    next(error);
  }
};