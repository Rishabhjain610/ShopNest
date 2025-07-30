const User = require("../model/user.model.js");
const getCurrentUser=async(req,res)=>{
  try {
    const user=await User.findById(req.userId).select("-password");//userid se currentusermilega
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error in getCurrentUser" });

  }
};

const getAdmin=async(req,res)=>{
  try {
    const adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ email: adminEmail, success: true, role: "admin" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}





module.exports={ getCurrentUser,getAdmin  };