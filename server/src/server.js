require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;

async function startServer() {
    if (!process.env.JWT_SECRET?.trim()) {
        throw new Error("Vui lòng cấu hình JWT_SECRET trong môi trường máy chủ");
    }

    jwt.sign({}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
