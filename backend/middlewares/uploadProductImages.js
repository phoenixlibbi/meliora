const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

// Ensure directory exists or create it
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Define storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    // Determine the upload path based on the fieldname
    if (file.fieldname === "frontImage" || file.fieldname === "backImage") {
      uploadPath = "public/images/uploads/products";
    } else if (file.fieldname.startsWith("step")) {
      uploadPath = "public/images/uploads/products/usage";
    }

    // Ensure the directory exists
    ensureDirectoryExists(uploadPath);

    // Proceed with the file destination
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Multer upload instance for handling multiple fields
const uploadMultiple = multer({
  storage,
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "step1Image", maxCount: 1 },
  { name: "step2Image", maxCount: 1 },
  { name: "step3Image", maxCount: 1 },
]);

// Middleware to handle any errors from multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    // General errors
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
  next();
};

module.exports = { uploadMultiple, multerErrorHandler };