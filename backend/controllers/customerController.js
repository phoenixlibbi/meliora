const Customer = require("../models/customerSchema");
const bcrypt = require("bcrypt");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const cust = req.body;
    const newCustomer = new Customer(cust);
    const savedCustomer = await newCustomer.save();
    res
      .status(201)
      .json({
        message: "Customer created successfully",
        customer: savedCustomer,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate("reviews")
      .populate("carts");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get customer by Email
exports.getCustomerByEmail = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.params.email });
    if (!customer) {
      return res.json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const { name, password, phone, address, deliveryAddress } = req.body;
    const updateData = {
      name,
      phone,
      address,
      deliveryAddress,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res
      .status(200)
      .json({
        message: "Customer updated successfully",
        customer: updatedCustomer,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Address
exports.updateAddress = async (req, res) => {
  const { email } = req.params;
  const { address } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.address = { ...customer.address, ...address };
    await customer.save();
    res.status(200).json({ message: "Address updated successfully", customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};