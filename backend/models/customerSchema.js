const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    picture: {
      type: String,
      required: [true, "Profile picture is required"],
      trim: true,
      default: "N/A"
    },
    address: {
      house: { type: String, default: "N/A"  },
      street: { type: String, default: "N/A"  },
      city: { type: String, default: "N/A"  },
      state: { type: String, default: "N/A"  },
      postalCode: { type: String, default: "N/A"  },
      country: { type: String, default: "N/A" },
    },
    deliveryAddress : {
      type: String,
      required: false,
      trim: true,
      minlength: [3,"Same as address or not"]
    },
    paymentMethods: {
      cashOnDelivery: {
        type: Boolean,
        default: true,
      },
      cardPayment: {
        cardNumber: { type: String, trim: true },
        expiryDate: { type: String },
        cvv: { type: String },
        nameOnCard: { type: String },
        billingAddress: { type: String },
        default: { type: Boolean, default: false },
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("Customer", customerSchema);