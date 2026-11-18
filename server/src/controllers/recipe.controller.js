const Recipe = require("../../models/Recipe");

exports.listRecipes = async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 12, 1),
      50
    );

    const filter = { status: "approved" };

    if (req.query.search?.trim()) {
      const safeSearch = req.query.search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.title = { $regex: safeSearch, $options: "i" };
    }

    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    if (req.query.maxCookingTime) {
      filter.cookingTime = { $lte: Number(req.query.maxCookingTime) };
    }

    const [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .populate("authorId", "name")
        .populate("categoryId", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),

      Recipe.countDocuments(filter),
    ]);

    res.json({
      data: recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      status: "approved",
    })
      .populate("authorId", "name")
      .populate("categoryId", "name");

    if (!recipe) {
      return res.status(404).json({
        message: "Không tìm thấy công thức",
      });
    }

    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};