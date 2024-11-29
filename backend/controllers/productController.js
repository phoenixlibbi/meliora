const Product = require("../models/productSchema");

// Create a new product
exports.createProduct = async (req, res) => {
  try {

    const {
      name,
      detail,
      subDetail,
      description,
      price,
      sizes,
      stockQuantity,
      usageTitle,
      steps,
    } = req.body;

    const files = req.files || {};
    let frontImage = "";
    let backImage = "";

    if (files.frontImage) {
      frontImage = `${req.protocol}://${req.get("host")}/images/uploads/products/${files.frontImage[0].filename}`;
    }
    if (files.backImage) {
      backImage = `${req.protocol}://${req.get("host")}/images/uploads/products/${files.backImage[0].filename}`;
    }

    if (files.step1Image) {
      steps.step1.image = `${req.protocol}://${req.get("host")}/images/uploads/products/usage/${files.step1Image[0].filename}`;
    }
    if (files.step2Image) {
      steps.step2.image = `${req.protocol}://${req.get("host")}/images/uploads/products/usage/${files.step2Image[0].filename}`;
    }
    if (files.step3Image) {
      steps.step3.image = `${req.protocol}://${req.get("host")}/images/uploads/products/usage/${files.step3Image[0].filename}`;
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      detail,
      subDetail,
      description,
      price,
      sizes,
      frontImage,
      backImage,
      stockQuantity,
      usageTitle,
      steps,
    });

    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      detail,
      subDetail,
      description,
      price,
      sizes,
      frontImage,
      backImage,
      stockQuantity,
      usageTitle,
      steps,
    } = req.body;

    if (files.frontImage) {
      frontImage = `${req.protocol}://${req.get("host")}/images/uploads/products/${files.frontImage[0].filename}`;
    }
    if (files.backImage) {
      backImage = `${req.protocol}://${req.get("host")}/images/uploads/products/${files.backImage[0].filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        detail,
        subDetail,
        description,
        price,
        sizes,
        frontImage,
        backImage,
        stockQuantity,
        usageTitle,
        steps,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product usage by ID
exports.getProductUsage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ usageTitle: product.usageTitle, steps: product.steps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product Usage ID
exports.updateProductUsage = async (req, res) => {
  try {
    const { usageTitle, steps } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        usageTitle,
        steps,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!steps || typeof steps !== "object") {
      return res.status(400).json({ message: "Invalid steps format" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
