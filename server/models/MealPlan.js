const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mealType: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    }
});

// Cho phép 1 bữa có nhiều món khác nhau, nhưng chặn thêm trùng 1 món 2 lần vào cùng 1 bữa
mealPlanSchema.index({ userId: 1, date: 1, mealType: 1, recipeId: 1 }, { unique: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema, 'mealPlans');