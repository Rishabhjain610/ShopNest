
import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

const statusOptions = [
  "order placed",
  "shipped",
  "delivered",
  "cancelled"
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchOrders = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setOrders(result.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result=await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      <Sidebar />
      <main className="flex-1 pt-24 px-4">
        <h1 className="text-4xl font-extrabold text-blue-500 text-center mb-10 tracking-wide drop-shadow-lg font-sans">
          All Orders
        </h1>
        <div className="max-w-5xl mx-auto bg-gray-950 rounded-2xl shadow-xl p-8">
          {orders.length === 0 ? (
            <p className="text-blue-200 text-center text-lg">No orders found.</p>
          ) : (
            <div className="grid gap-8">
              {orders.map((order, idx) => (
                <div
                  key={order._id || idx}
                  className="bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-blue-900/30 hover:shadow-blue-400/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <span className="font-bold text-blue-300 text-lg">
                      Order ID: {order._id}
                    </span>
                    <span className="text-blue-100">
                      {new Date(order.date).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-white text-base mb-2">
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.address?.firstName} {order.address?.lastName},{" "}
                    {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
                  </div>
                  <div className="flex flex-wrap gap-6 mb-2 items-center">
                    <span className="text-blue-100 flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm font-semibold border border-blue-700 focus:outline-none"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </span>
                    <span className="text-blue-100">
                      <span className="font-semibold">Payment:</span> {order.paymentMethod}
                    </span>
                    <span className="text-blue-100">
                      <span className="font-semibold">Amount:</span> ₹{order.amount}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-200">Items:</span>
                    <ul className="ml-4 list-disc text-blue-100">
                      {order.items?.map((item, i) => (
                        <li key={item._id + i}>
                          <span className="font-bold">{item.name}</span> x {item.quantity} <span className="text-xs">({item.size})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;