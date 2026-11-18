const mongoose = require("mongoose");

async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
        await mongoose.connect(mongoUri);
        console.log("Đã kết nối MongoDB");
    } catch (error) {
        console.error("Kết nối MongoDB thất bại: ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;