const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { create } = require("../../models/Category");

function createToken(user) {
    return jwt.sign(
        {userId: user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "7d"}
    );
}

exports.register = async (req,res,next) => {
    try {
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json ({
                message: "Vui lòng nhập tên,email và mật khẩu",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Mật khẩu cần ít nhất 8 ký tự",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({email: normalizedEmail});

        if (existingUser) {
            return res.status(409).json({ message: "Email đã được dùng"});
        }

        const passwordHash = await brcypt.hash(password,10);
        const user = await User.create ({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash
        });

        return res.status(201).json ({
            message: "Đăng ký thành công",
            token: createToken(user),
            user: {
                id:user._id,
                name: user.name,
                email: user.email, 
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async(req,res,next) => {
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json ({
                message: "Vui lòng nhập email và mật khẩu",
            });
        }
        
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user || !(await brcypt.compare(password, user.passwordHash))) {
            return res.status(401).json ({
                message: "Tài khoản hoặc mật khẩu không đúng",
            });
        }
        
        return res.json({
            message: "Đăng nhập thành công",
            token: createToken(user),
            user: {
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    } catch(error) {
        next(error);
    }
};

