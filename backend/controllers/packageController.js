const Package = require("../models/packageSchema");

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const {
      name,
      details,
      subDetails,
      description,
      subDescription,
      size,
      type,
      price,
      products,
      isAvailable,
    } = req.body;

    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/uploads/packages/${
        req.file.filename
      }`;
    }

    const newPackage = new Package({
      name,
      details,
      subDetails,
      description,
      subDescription,
      size,
      type,
      price,
      image,
      products,
      isAvailable,
    });

    const savedPackage = await newPackage.save();
    res
      .status(201)
      .json({ message: "Package created successfully", package: savedPackage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update package by ID
exports.updatePackage = async (req, res) => {
  try {
    const {
      name,
      details,
      subDetails,
      description,
      subDescription,
      size,
      type,
      price,
      products,
      isAvailable,
    } = req.body;

    // Initialize an update object
    const updateData = {
      name,
      details,
      subDetails,
      description,
      subDescription,
      size,
      type,
      price,
      products,
      isAvailable,
    };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get(
        "host"
      )}/images/uploads/packages/${req.file.filename}`;
    }
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete package by ID
exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
