const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

// Ensure the directory exists
const uploadPath = "public/images/uploads/admins/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;