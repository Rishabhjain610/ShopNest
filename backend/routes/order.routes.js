const express=require('express');
const OrderRouter=express.Router();
const isAuth=require('../middleware/isAuth'); 
const {PlaceOrder,userOrders,placeOrderRazorpay}=require('../controller/order.controller');
const adminAuth= require("../middleware/adminAuth");
const {allOrders,updateStatus}=require('../controller/order.controller');

//for admin
OrderRouter.post('/list',adminAuth,allOrders);
OrderRouter.post('/status',adminAuth,updateStatus);

//for user
OrderRouter.post('/checkout',isAuth,PlaceOrder);
OrderRouter.post('/order',isAuth,userOrders);
OrderRouter.post('/razorpay',isAuth,placeOrderRazorpay);



//
module.exports=OrderRouter;