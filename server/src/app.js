const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recipes",require("./routes/recipes.route"));

app.use("/api/auth",require("./routes/auth.routes"));

app.get("/api/health",(req,res) => {
    res.json({message: "API đang hoạt động"});
});

app.use("/api/meal-plans", require("./routes/mealPlans.routes"));

app.use("/api/admin", require("./routes/admin.routes"));


app.use("/api/categories", require("./routes/categories.routes"));

app.use("/api/favorites", require("./routes/favorites.routes"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(require("./middleware/errorHandler"));

module.exports = app;