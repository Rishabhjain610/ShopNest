const Order = require("../model/order.model");
const User = require("../model/user.model");
const razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();
const twilio = require('twilio');
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    
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
    await twilioClient.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+918433943227',
      body: `Order placed! Order ID: ${newOrder._id}\nAmount: ₹${amount}\nThank you for shopping with us! Mode of payment ${newOrder.paymentMethod}`
    });
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
    const { items, amount, address,phone } = req.body;
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
  
    const order = await razorpayInstance.orders.create(options);
    await twilioClient.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+918433943227',
      body: `Order placed! Order ID: ${newOrder._id}\nAmount: ₹${amount}\nThank you for shopping with us! Mode of payment ${newOrder.paymentMethod}`
    });
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








const verifyRazorpay=async(req,res)=>{
  try {
    const userId=req.userId;
    const { razorpay_order_id,razorpay_payment_id } = req.body;
    const result = await razorpayInstance.payments.fetch(razorpay_payment_id);
    if (result.status === "captured" || result.status === "paid") {
      await Order.findByIdAndUpdate(result.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (error) {
    console.error("Razorpay payment verification failed:", error);
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
  verifyRazorpay
};
