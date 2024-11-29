const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerSchema");
const Admin = require("../models/adminSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new Customer({ name, email, password });
    await newUser.save();

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    // Send response with tokens and user info
    res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        email: newUser.email,
        name: newUser.name,
        picture: newUser.picture || null, // Assuming optional fields
        address: newUser.address || null,
        isVerified: newUser.isVerified || false,
      },
    });
  } catch (error) {
    console.error("Error in userSignUp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!user.password) {
      return res.status(500).json({
        message: "Please use auth0 to Sign in with Google or Facebook.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        address: user.address,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error in userSignIn:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(admin._id, "admin");
    const refreshToken = generateRefreshToken(admin._id, "admin");

    res.status(200).json({
      accessToken,
      refreshToken,
      admin: { email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const verifyToken = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const tokenType = req.headers["token-type"]; // either "access" or "refresh"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!tokenType || (tokenType !== "access" && tokenType !== "refresh")) {
    return res.status(400).json({ message: "Invalid or missing token type" });
  }

  const secret = tokenType === "access" ? JWT_SECRET : JWT_REFRESH_SECRET;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(200).json({
      message: "Token is valid",
      tokenType,
    });
  });
};

module.exports = {
  userSignUp,
  userSignIn,
  adminLogin,
  refreshToken,
  verifyToken,
};
