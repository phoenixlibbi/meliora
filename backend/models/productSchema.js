const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters long"],
      maxlength: [100, "Product name must not exceed 100 characters"],
    },
    detail: {
      type: String,
      required: [true, "Product Detail is required"],
      trim: true,
      minlength: [10, "Detail must be at least 10 characters long"],
    },
    subDetail: {
      type: String,
      required: [true, "Product sub-detail is required"],
      trim: true,
      minlength: [10, "Sub-detail must be at least 10 characters long"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    sizes: [
      {
        size: {
          type: String,
          required: true,
          enum: ["Small", "Medium", "Large", "XL", "Other"],
        },
        quantity: {
          type: Number,
          required: true, 
        },
      },
    ],
    frontImage: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    backImage: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 1,
    },
    usageTitle: {
      type: String,
      required: [true, "Product Usage title is required"],
      trim: true,
      minlength: [5, "Product Usage title must be at least 5 characters long"],
    },
    steps: {
      step1: {
        title: {
          type: String,
          required: [true, "Step 1 title is required"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Step 1 description is required"],
          trim: true,
        },
        image: {
          type: String,
          required: [true, "Step 1 image is required"],
          trim: true,
        },
      },
      step2: {
        title: {
          type: String,
          required: [true, "Step 2 title is required"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Step 2 description is required"],
          trim: true,
        },
        image: {
          type: String,
          required: [true, "Step 2 image is required"],
          trim: true,
        },
      },
      step3: {
        title: {
          type: String,
          required: [true, "Step 3 title is required"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Step 3 description is required"],
          trim: true,
        },
        image: {
          type: String,
          required: [true, "Step 3 image is required"],
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
