import React, { useState, useContext } from "react";
import { ShopDataContext } from "../contextapi/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { AuthDataContext } from "../contextapi/AuthContext";

import axios from "axios";
const Checkout = () => {
  const { getCartAmount, currency, cartItem, setCartItem, products } =
    useContext(ShopDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Get cart total from context
  const cartTotal = getCartAmount();
  const deliveryCharge = 40;
  const grandTotal = cartTotal + deliveryCharge;
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item].quantity > 0) {
            const itemInfo = structuredClone(
              products.products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item].quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: form,
        items: orderItems,
        amount: getCartAmount() + deliveryCharge,
      };

      switch (paymentMethod) {
        case "cod": {
          try {
            
            const result = await axios.post(
              `${serverUrl}/api/order/checkout`,
              orderData,
              { withCredentials: true }
            );
            console.log(result.data);
            console.log(cartItem);
            setCartItem({});
            navigate("/order");
          } catch (error) {
            console.error("Order placement failed:", error);
          }
          break;
        }
        case "razorpay": {
          try {
            console.log("Razorpay order data:", orderData);
            const result = await axios.post(
              `${serverUrl}/api/order/razorpay`,
              orderData,
              { withCredentials: true }
            );
            if (result.data.success) {
              initPay(result.data.data);
            }
            setCartItem({});
            
          } catch (error) {
            console.error("Razorpay payment failed:", error);
          }
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-2 pb-8 pt-32">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 rounded-3xl shadow-2xl py-8 px-4 sm:px-10 w-full max-w-5xl flex flex-col sm:flex-row gap-8"
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
      >
        {/* Address Form */}
        <div className="flex-1">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-8 text-center tracking-wide drop-shadow-lg">
            Checkout
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-blue-200 font-semibold mb-1 text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-200 font-semibold mb-1 text-base">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-200 font-semibold mb-1 text-base">
              Street
            </label>
            <input
              type="text"
              name="street"
              required
              value={form.street}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                State
              </label>
              <input
                type="text"
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="State"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                required
                value={form.pincode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="Pincode"
              />
            </div>
            <div>
              <label className="block text-blue-200 font-semibold mb-1 text-base">
                Country
              </label>
              <input
                type="text"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-blue-700/30 text-base focus:ring-2 focus:ring-blue-500"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        {/* Price Calculation & Payment Options */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-blue-900/20 rounded-2xl px-6 py-6 shadow-lg flex flex-col gap-4 mb-4">
            <h3
              className="text-2xl sm:text-3xl font-bold text-blue-300 mb-4 text-center tracking-wide drop-shadow"
              style={{ fontFamily: "Inter, Arial, sans-serif" }}
            >
              Order Summary
            </h3>
            <div className="flex justify-between items-center mb-1 text-lg sm:text-xl">
              <span className="text-blue-200">Cart Total</span>
              <span className="font-bold text-blue-100">
                {currency}
                {cartTotal}
              </span>
            </div>
            <div className="flex justify-between items-center mb-1 text-lg sm:text-xl">
              <span className="text-blue-200">Delivery Charges</span>
              <span className="font-bold text-blue-100">
                {currency}
                {deliveryCharge}
              </span>
            </div>
            <div className="border-t border-blue-700/30 my-2"></div>
            <div className="flex justify-between items-center text-xl sm:text-2xl font-bold">
              <span className="text-blue-300">Grand Total</span>
              <span className="text-blue-100">
                {currency}
                {grandTotal}
              </span>
            </div>
          </div>
          <div className="bg-blue-900/10 rounded-xl px-4 py-4 shadow flex flex-col gap-4 mb-4">
            <label className="block text-blue-200 font-semibold mb-2 text-lg">
              Payment Method
            </label>
            <div className="flex gap-4 flex-wrap justify-center">
              <div
                onClick={() => handlePaymentChange("razorpay")}
                className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === "razorpay"
                    ? "border-blue-500 bg-blue-900/30"
                    : "border-gray-600 bg-gray-800/50"
                }`}
              >
                <SiRazorpay className="text-blue-400" size={28} />
                <span className="text-blue-100 text-lg font-semibold">
                  Razorpay
                </span>
              </div>
              <div
                onClick={() => handlePaymentChange("cod")}
                className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === "cod"
                    ? "border-green-500 bg-green-900/30"
                    : "border-gray-600 bg-gray-800/50"
                }`}
              >
                <FaMoneyBillWave className="text-green-400" size={28} />
                <span className="text-blue-100 text-lg font-semibold">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Place Order
          </button>
        </div>
      </form>
      {/* Responsive: stack vertically on mobile */}
      <style>{`
        @media (max-width: 640px) {
          form {
            flex-direction: column !important;
            max-height: none !important;
          }
          .flex-1 {
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
