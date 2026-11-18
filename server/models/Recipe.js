const mongoose = require('mongoose');
const { validate } = require('./Category');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, //VD: "thit ba chi"
    amount: { type: Number, required: true },
    unit: { type: String, required: true, trim: true },
}, { _id: false });

const stepSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    imageUrl: { type: String, default: '' }
}, { _id: false });

const recipeSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Vui lòng nhập tên món ăn'],
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'Vui lòng tải lên ảnh món ăn']
        },
        cookingTime: {
            type: Number,
            required: true,
            min: 1, // tính bằng phút
        },
        servings: {
            type: Number,
            required: true,
            default: 2,
            min: 1,
        },
        difficulty: {
            type: String,
            enum: ['Dễ', 'Trung bình', 'Khó'],
            default: 'Dễ'
        },
        ingredient: {
            type: [ingredientSchema],
            validate: [val => val.length > 0, 'Món ăn phải có ít nhất một nguyên liệu'],
        },
        steps: {
            type: [stepSchema],
            validate: [val => val.length > 0, 'Món ăn phải có ít nhất một bước thực hiện']
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'hidden'],
            default: 'pending' //mặc định chờ Admin duyệt mới thực hiện được hành động
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        }
    },
    {
    timestamps: { createdAt: true, updatedAt: false }
    }
);

module.exports = mongoose.model('Recipe', recipeSchema);