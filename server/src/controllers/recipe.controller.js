const Recipe = require("../../models/Recipe");
const Review = require("../../models/Review");

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

exports.createRecipe = async (req,res,next) => {
  try {
    const {
      categoryId,
      title,
      description,
      imageUrl,
      cookingTime,
      servings,
      difficulty,
      ingredient,
      steps,
    } = req.body;

    if (
      !categoryId ||
      !title?.trim() ||
      !description?.trim() ||
      !imageUrl ||
      !cookingTime ||
      !servings ||
      !Array.isArray(ingredient) ||
      ingredient.length === 0 ||
      !Array.isArray(steps) ||
      steps.length === 0
    ) {
      return res.status(400).json ({
        message: "Vui lòng nhập đủ thông tin",
      });
    }

    const allowedDifficulties = ["Dễ","Trung bình","Khó"];

    if (difficulty && !allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({message : "Độ khó không hợp lệ"});
    }

    const recipe = await Recipe.create({
      authorId: req.user.id,
      categoryId,
      title: title.trim(),
      description: description.trim(),
      imagaUrl,
      cookingTime:Number(cookingTime),
      servings:Number(servings),
      difficulty,
      ingredient,
      steps,
    });

    res.status(201).json({
      message: "Đã gửi công thức,đang chờ duyệt",
      data:recipe,
    });
  }catch(eror) {
    next(error);
  }
};

exports.updateRecipe = async (req,res,next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({message: "Không tìm thấy công thức"});
    }

    if (recipe.authorId.toString() != req.user.id) {
      return res.status(403).json({message: "Bạn không sở hữu công thức này"});
    }

    const allowedFields = [
      "categoryId",
      "title",
      "description",
      "imageUrl",
      "cookingTime",
      "servings",
      "dificulty",
      "ingredient",
      "steps",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        recipe[field] = req.body[field];
      }
    }

    await recipe.save();

    res.json({message: "Đã cập nhật công thức",data:recipe});
  }catch (error) {
    next (error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Không tìm thấy công thức" });
    }

    if (recipe.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không sở hữu công thức này" });
    }

    await recipe.deleteOne();

    res.json({ message: "Đã xóa công thức" });
  } catch (error) {
    next(error);
  }
};

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
      isHidden: false,
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
    const { rating, comment } = req.body;
    const numericRating = Number(rating);

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

    const [stats] = await Review.aggregate([
      {
        $match: {
          recipeId: recipe._id,
          isHidden: false,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    recipe.averageRating = Math.round(stats.averageRating * 10) / 10;
    recipe.reviewCount = stats.reviewCount;
    await recipe.save();

    res.status(201).json({
      message: "Đã gửi đánh giá",
      data: review,
      averageRating: recipe.averageRating,
      reviewCount: recipe.reviewCount,
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

exports.searchByIngredients = async (req, res, next) => {
  try {
    const rawIngredients = Array.isArray(req.query.ingredients)
      ? req.query.ingredients
      : [req.query.ingredients || ""];

    const ingredientNames = [
      ...new Set(
        rawIngredients
          .flatMap((value) => value.split(","))
          .map((name) => name.trim().toLowerCase())
          .filter(Boolean)
      ),
    ];

    if (ingredientNames.length === 0) {
      return res.status(400).json({
        message: "Hãy nhập ít nhất một nguyên liệu để tìm",
      });
    }

    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 12, 1),
      50
    );

    const [result] = await Recipe.aggregate([
      { $match: { status: "approved" } },
      {
        $addFields: {
          _ingredientNames: {
            $map: {
              input: "$ingredient",
              as: "item",
              in: { $toLower: "$$item.name" },
            },
          },
        },
      },
      {
        $addFields: {
          matchedIngredientNames: {
            $setIntersection: ["$_ingredientNames", ingredientNames],
          },
        },
      },
      {
        $addFields: {
          matchedIngredientCount: { $size: "$matchedIngredientNames" },
        },
      },
      { $match: { matchedIngredientCount: { $gt: 0 } } },
      { $project: { _ingredientNames: 0 } },
      {
        $facet: {
          data: [
            {
              $sort: {
                matchedIngredientCount: -1,
                averageRating: -1,
                createdAt: -1,
              },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
          metadata: [{ $count: "total" }],
        },
      },
    ]);

    const recipes = result?.data || [];
    const total = result?.metadata[0]?.total || 0;

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