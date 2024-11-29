const express = require("express");
const router = express.Router();
const adminRouter = require("./adminRouter");
const customerRouter = require("./customerRouter");
const productRouter = require("./productRouter");
const packageRouter = require("./packageRouter");
const reviewRouter = require("./reviewRouter");
const orderRouter = require("./orderRouter");
const blogRouter = require("./blogRouter");
const {
  userSignUp,
  userSignIn,
  adminLogin,
  refreshToken,
  verifyToken,
} = require("../auth/auth");

router.use("/admins", adminRouter);
router.use("/products", productRouter);
router.use("/customers", customerRouter);
router.use("/package", packageRouter);
router.use("/review", reviewRouter);
router.use("/order", orderRouter);
router.use("/blog", blogRouter);
router.post("/auth/user/signup", userSignUp);
router.post("/auth/user/signin", userSignIn);
router.post("/auth/admin/login", adminLogin);
router.post("/auth/token/refresh", refreshToken);
router.post("/auth/token/verify", verifyToken);

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/test", (req, res) => {
  res.send("Test works");
});

module.exports = router;
