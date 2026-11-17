require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectDB();
    app.listen(PORT,()=> {
    console.log(`Server đang chạy tại https://localhost:${PORT}`);
});
}

startServer();