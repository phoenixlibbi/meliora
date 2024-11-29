const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      auth0Id: {
        type: String,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
    },
    billingDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        house: {
          type: String,
          default: "N/A",
        },
        street: {
          type: String,
          required: [true, "Street address is required"],
        },
        city: {
          type: String,
          required: [true, "City is required"],
        },
        state: {
          type: String,
          default: "N/A",
        },
        postalCode: {
          type: String,
          default: "N/A",
        },
        country: {
          type: String,
          default: "Pakistan",
        },
      },
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"],
          },
          quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 1,
          },
        },
      ],
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Other"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "delivered", "completed", "cancelled"],
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);

// Middleware to update `updated_at` on updates
orderSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
