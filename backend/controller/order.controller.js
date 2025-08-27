const Order=require('../model/order.model');
const User=require('../model/user.model');
const PlaceOrder=async(req,res)=>{
  try {
    const {items,amount,address}=req.body;
    const userId=req.userId;
    const orderSchema={
      items,
      amount,
      address,
      userId,
      paymentMethod:'COD',
      payment:false,
      date:Date.now()

    }
    const newOrder=await Order.create(orderSchema);
    await User.findByIdAndUpdate(userId,{cartData:{}});
    res.status(201).json({
      success:true,
      message:"Order placed successfully",
      data:newOrder
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal server error",
      error:error.message
    })
  }
}
module.exports={PlaceOrder};