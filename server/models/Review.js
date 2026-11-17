const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true,
            default: ''
        },
        isHidden: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

reviewSchema.index({ recipeId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);