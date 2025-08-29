const Order = require("../model/order.model");
const User = require("../model/user.model");
const razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderSchema = {
      items,
      amount,
      address,
      userId,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = await Order.create(orderSchema);
    const options = {
      amount: newOrder.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: newOrder._id.toString(),
    };
    console.log("Razorpay options:",options)
    // await razorpayInstance.orders.create(options, (error, order) => {
    //   if (error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: "Internal server error",
    //       error: error.message,
    //     });
    //   }
    //   res.status(201).json({
    //     success: true,
    //     message: "Order placed successfully",
    //     data: order,
    //   });
    // });
    const order = await razorpayInstance.orders.create(options);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  PlaceOrder,
  userOrders,
  allOrders,
  updateStatus,
  placeOrderRazorpay,
};
