const mongoose = require("mongoose");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");
const validator = require("validator");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cartData: {},
      isGoogleUser: false,
    });
    const token = await createToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Register Server Error" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res
      .status(200)
      .json({ message: "Login successful", user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Login Server Error" });
  }
};
const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = await createToken(existingUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
      return res.status(200).json({
        message: "Login successful",
        user: existingUser,
        success: true,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password: "",
        cartData: {},
        isGoogleUser: true,
      });
      const token = await createToken(newUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Google Login Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Logout Server Error" });
  }
};
module.exports = { register, Login, logout, googleLogin };
