const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập họ tên'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member',
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
    timestamps: { createdAt: true, updatedAt: false }
});

module.exxports = mongoose.model('User', userSchema);