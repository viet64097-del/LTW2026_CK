const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

function createSession(user) {
    const { _id, name, email, role } = user;
    const token = jwt.sign(
        { userId: _id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return { token, user: { id: _id, name, email, role } };
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};

        if (typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            typeof password !== "string" || !password) {
            return res.status(400).json({ message: "Vui lòng nhập tên, email và mật khẩu" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Mật khẩu cần ít nhất 8 ký tự" });
        }

        if (bcrypt.truncates(password)) {
            return res.status(400).json({ message: "Mật khẩu quá dài (tối đa 72 byte)" });
        }

        const existingUser = await User.exists({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "Email đã được dùng" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash
        });

        return res.status(201).json({
            message: "Đăng ký thành công",
            ...createSession(user)
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email đã được dùng" });
        }

        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (typeof email !== "string" || !email.trim() ||
            typeof password !== "string" || !password) {
            return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }

        return res.json({
            message: "Đăng nhập thành công",
            ...createSession(user)
        });
    } catch (error) {
        next(error);
    }
};
