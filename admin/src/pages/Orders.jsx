import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useContext, useEffect } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
const Orders = () => {
  const [orders, setorders] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchOrders = async (req, res) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setorders(result.data);
      console.log(orders);
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
        <h1 className="text-4xl font-extrabold text-blue-500 text-center mb-10 tracking-wide drop-shadow-lg">
          All Orders
        </h1>
        <div className="max-w-5xl mx-auto bg-gray-950 rounded-2xl shadow-xl p-8">
          {orders.map((item, idx) => {
            <div>

            </div>
          })}
        </div>
      </main>
    </div>
  );
};

export default Orders;
