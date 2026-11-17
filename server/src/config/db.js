const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Đã kết nối MongoDB");
    } catch (error) {
        console.error("Kết nối MongoDB thất bại: ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;