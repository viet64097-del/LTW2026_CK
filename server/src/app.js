const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recipes",require("./routes/recipes.route"));

app.use("/api/auth",require("./routes/auth.routes"));

app.get("/api/health",(req,res) => {
    res.json({message: "API đang hoạt động"});
});

module.exports = app;