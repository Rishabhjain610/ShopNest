const express = require('express');
const CartRouter = express.Router();

// Import controller functions
const { addTocart, getUserCart, updateCart } = require("../controller/cart.controller");

// Import authentication middleware
const isAuth = require("../middleware/isAuth");

// Add to cart route (protected)
CartRouter.post("/add", isAuth, addTocart);

// Get user's cart route (protected)
CartRouter.post("/user", isAuth, getUserCart);

// Update cart route (protected)
CartRouter.post("/update", isAuth, updateCart);

module.exports =  CartRouter;