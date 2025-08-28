const Order = require("../model/order.model");
const User = require("../model/user.model");
const PlaceOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderSchema = {
      items,
      amount,
      address,
      userId,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = await Order.create(orderSchema);
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).populate("items.productId");
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//for admin

const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { PlaceOrder, userOrders, allOrders, updateStatus };
