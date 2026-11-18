const jwt = require("jsonwebtoken");

function requireAuth(req,res,next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Bạn cần đăng nhập"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        req.user = {
            id:payload.userId,
            role:payload.role,
        };
        
        next();
    }catch(error) {
        return res.status(401).json({message: "Token không hợp lệ hoặc hết hạn"});
    }
}

function requireAdmin(req,res,next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Bạn không có quyền admin "});
    }

    next();
}

module.exports = {requireAuth,requireAdmin};