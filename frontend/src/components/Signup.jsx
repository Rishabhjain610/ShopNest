import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import { useContext } from "react";
import { AuthDataContext } from "../contextapi/AuthContext.jsx";
import { UserDataContext } from "../contextapi/UserContext.jsx";
import { toast } from "react-toastify";
const Signup = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Signup successful:", result.data);
      toast.success(result.data.message);
      getCurrentUser(); // Fetch the current user data after signup
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const result2 = await axios.post(
        `${serverUrl}/api/auth/googleLogin`,
        { name, email },
        {
          withCredentials: true,
        }
      );
      console.log("Google authentication successful:", result2.data);
      toast.success(result2.data.message);
      getCurrentUser(); // Fetch the current user data after Google login
      navigate("/");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Google authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg border border-black p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create your ShopNest account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
              className="w-full pl-10 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-3 border border-black bg-white text-black font-medium rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Continue with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-black font-medium hover:underline cursor-pointer"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
