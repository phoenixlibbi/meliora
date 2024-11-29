const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const Customer = require("../models/customerSchema");

// Place a new order
exports.neworder = async (req, res) => {
  try {
    const { user, billingDetails, cart, paymentMethod, totalAmount, status } =
      req.body;

    if (!user || !cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid data. User or cart is missing." });
    }

    const productChecks = await Promise.all(
      cart.items.map((item) => Product.findById(item.productId))
    );

    if (productChecks.some((product) => !product)) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }

    const newOrder = new Order({
      user: {
        auth0Id: user.auth0Id,
        name: user.name,
        email: user.email,
      },
      billingDetails: {
        name: billingDetails.name,
        email: billingDetails.email,
        phone: billingDetails.phone,
        address: {
          house: billingDetails.address.house,
          street: billingDetails.address.street,
          city: billingDetails.address.city,
          state: billingDetails.address.state,
          postalCode: billingDetails.address.postalCode,
          country: billingDetails.address.country,
        },
      },
      cart: {
        items: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      paymentMethod,
      totalAmount,
      status: status || "pending",
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Orders
exports.getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by CustomerID
exports.getOrderByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const orders = await Order.find({ customerId: customerId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders for this customer" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by Customer Email
exports.getOrderByCustomerEmail = async (req, res) => {
  try {
    const { customerEmail } = req.params;

    // Find orders based on billingDetails.email
    const orders = await Order.find({ 'billingDetails.email': customerEmail });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this customer" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updated = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updated, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", Order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cal revenue
exports.getRevenue = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.status(200).json({
      message: "Total revenue calculated successfully",
      revenue: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating revenue", error });
  }
};

// Get top selling product
exports.topSellingProduct = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const productCount = {};
    let totalItemCount = 0; // To count the total number of items sold

    // Count occurrences of each productId within the cart items and total item count
    completedOrders.forEach((order) => {
      order.cart.items.forEach((item) => {
        const productId = item.productId.toString();
        productCount[productId] = (productCount[productId] || 0) + item.quantity;
        totalItemCount += item.quantity; // Add the item quantity to the total count
      });
    });

    if (Object.keys(productCount).length === 0) {
      return res.status(404).json({ message: "No completed orders found" });
    }

    // Find the top product ID
    const topProductId = Object.keys(productCount).reduce((a, b) =>
      productCount[a] > productCount[b] ? a : b
    );
    const topProductCount = productCount[topProductId];

    // Calculate the percentage based on total items sold
    const topProductPercentage = (
      (topProductCount / totalItemCount) *
      100
    ).toFixed(2);

    const topProduct = await Product.findById(topProductId);

    res.status(200).json({
      name: topProduct ? topProduct.name : "No top-selling product",
      percentage: topProduct ? parseFloat(topProductPercentage) : 0,
      totalItemCount, // Optional: to show the total number of items sold
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top-selling product", error });
  }
};

// Get monthly sales data for line chart
exports.lineStats = async (req, res) => {
  try {
    // Fetch all completed orders
    const completedOrders = await Order.find({ status: "completed" });

    if (completedOrders.length === 0) {
      return res.status(404).json({ message: "No completed orders found" });
    }

    // Aggregate monthly sales for all products
    const monthlySales = await Order.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $unwind: "$cart.items", // Flatten the cart items array
      },
      {
        $group: {
          _id: {
            productId: "$cart.items.productId",
            month: { $month: "$created_at" },
          },
          count: { $sum: "$cart.items.quantity" },
        },
      },
      {
        $group: {
          _id: "$_id.productId", // Group by product ID
          monthlySales: {
            $push: {
              month: "$_id.month",
              count: "$count",
            },
          },
        },
      },
    ]);

    // Fetch product names and structure the final result
    const productsData = [];
    for (const entry of monthlySales) {
      const product = await Product.findById(entry._id);
      if (!product) continue;

      // Initialize an array with zeros for all 12 months
      const salesData = Array(12).fill(0);

      // Populate salesData array with the correct counts
      entry.monthlySales.forEach((sale) => {
        const monthIndex = sale.month - 1; // Convert month to 0-indexed
        salesData[monthIndex] = sale.count;
      });

      productsData.push({
        name: product.name,
        data: salesData,
      });
    }

    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product stats",
      error: error.message,
    });
  }
};

// Get top-selling product and monthly sales data for bar chart
exports.barStats = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const productCount = {};

    completedOrders.forEach((order) => {
      order.cart.items.forEach((item) => {
        const productId = item.productId.toString();
        productCount[productId] =
          (productCount[productId] || 0) + item.quantity;
      });
    });

    if (Object.keys(productCount).length === 0) {
      return res.status(404).json({ message: "No completed orders found" });
    }

    const topProductId = Object.keys(productCount).reduce((a, b) =>
      productCount[a] > productCount[b] ? a : b
    );
    const topProduct = await Product.findById(topProductId);
    if (!topProduct) {
      return res.status(404).json({ message: "Top-selling product not found" });
    }

    const monthlySales = await Order.aggregate([
      {
        $match: {
          status: "completed",
          "cart.items.productId": topProduct._id,
        },
      },
      {
        $unwind: "$cart.items",
      },
      {
        $match: {
          "cart.items.productId": topProduct._id,
        },
      },
      {
        $group: {
          _id: { $month: "$created_at" },
          count: { $sum: "$cart.items.quantity" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const salesData = Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      value: 0,
    }));
    monthlySales.forEach((entry) => {
      const monthIndex = entry._id - 1;
      salesData[monthIndex].value = entry.count;
    });

    res.status(200).json({
      name: topProduct.name,
      salesData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top-selling product stats", error });
  }
};