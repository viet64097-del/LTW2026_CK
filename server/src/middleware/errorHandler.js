const multer = require("multer");

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "Ảnh không được lớn hơn 5 MB" });
    }

    return res.status(400).json({ message: "Tệp tải lên không hợp lệ" });
  }

  if (err.message === "Chỉ nhận ảnh JPEG, PNG hoặc WebP") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "Dữ liệu đã tồn tại" });
  }

  console.error(err);
  return res.status(500).json({ message: "Lỗi máy chủ" });
};