import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext.jsx";

const Login = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate(); // FIXED: Moved to top

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminLogin`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Login successful:", result.data);
      toast.success(result.data.message || "Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed"); // FIXED: Added error handling
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg border border-black p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black">Log In</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome back to ShopNest</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
              className="w-full pl-10 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
            />
          </div>
          <div className="relative">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
              className="w-full pl-10 pr-10 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4 text-gray-500 hover:text-black" />
              ) : (
                <FaEye className="h-4 w-4 text-gray-500 hover:text-black" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
