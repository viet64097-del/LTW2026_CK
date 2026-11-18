const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const extensionsByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    const extension = extensionsByMimeType[file.mimetype];
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

function fileFilter(req, file, callback) {
  if (!extensionsByMimeType[file.mimetype]) {
    return callback(new Error("Chỉ nhận ảnh JPEG, PNG hoặc WebP"));
  }

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;