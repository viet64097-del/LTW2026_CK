const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

function makeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, slug } = req.body ?? {};

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Tên danh mục là bắt buộc" });
    }
    if ((description != null && typeof description !== "string") ||
        (slug != null && typeof slug !== "string")) {
      return res.status(400).json({ message: "Mô tả và slug danh mục phải là chuỗi" });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || "",
      slug: makeSlug(slug || name),
    });

    res.status(201).json({ message: "Đã tạo danh mục", data: category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Slug danh mục đã tồn tại" });
    }

    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    const { name, description, slug } = req.body ?? {};

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
      return res.status(400).json({ message: "Tên danh mục không hợp lệ" });
    }
    if ((description !== undefined && typeof description !== "string") ||
        (slug != null && typeof slug !== "string")) {
      return res.status(400).json({ message: "Mô tả và slug danh mục phải là chuỗi" });
    }

    if (name !== undefined) {
      category.name = name.trim();
    }

    if (description !== undefined) {
      category.description = description.trim();
    }

    if (slug !== undefined || name !== undefined) {
      category.slug = makeSlug(slug || category.name);
    }

    await category.save();

    res.json({ message: "Đã cập nhật danh mục", data: category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Slug danh mục đã tồn tại" });
    }

    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    const categoryIsUsed = await Recipe.exists({
      categoryId: category._id,
    });

    if (categoryIsUsed) {
      return res.status(409).json({
        message: "Không thể xóa danh mục đang được sử dụng",
      });
    }

    await category.deleteOne();

    res.json({ message: "Đã xóa danh mục" });
  } catch (error) {
    next(error);
  }
};
