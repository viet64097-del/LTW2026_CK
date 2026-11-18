const express = require("express");
const {register,login} = require("../controllers/auth.controller");
const router = express.Router();

const {requireAuth} = require("../middleware/auth");

router.post("/register",register);
router.post("/login",login);

router.get("/me",requireAuth, (req,res) => {
    res.json({ user: req.user});
});

module.exports = router;