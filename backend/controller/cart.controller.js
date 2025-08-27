const User = require("../model/user.model");
const addTocart = async (req, res) => {
  try {
    const { size, id } = req.body;
    const userData = await User.findById(req.userId);//middlware se id milegi
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[id]) {
      if (cartData[id][size]) {
        cartData[id][size].quantity += 1;
      } else {
        cartData[id][size] = { quantity: 1 };
      }
    } else {
      cartData[id] = {};
      cartData[id][size] = { quantity: 1 };
    }
    await User.findByIdAndUpdate(req.userId, { cartData }, { new: true });
    res.status(200).json({ message: "Cart updated successfully", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};










const updateCart = async (req, res) => {
  try {
    const { id, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[id]) {
      if (cartData[id][size]) {
        cartData[id][size].quantity = quantity;
      } else {
        cartData[id][size] = { quantity };
      }
    } else {
      cartData[id] = {};
      cartData[id][size] = { quantity };
    }
    await User.findByIdAndUpdate(req.userId, { cartData }, { new: true });
    res.status(200).json({ message: "Cart updated successfully", cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};








const getUserCart=async(req,res)=>{

  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartData = userData.cartData || {};
    res.status(200).json({ message: "Cart retrieved successfully", cartData });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}






module.exports = { addTocart, updateCart ,getUserCart};
