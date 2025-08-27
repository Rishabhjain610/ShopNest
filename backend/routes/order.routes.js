const express=require('express');
const OrderRouter=express.Router();
const isAuth=require('../middleware/isAuth'); 
const {PlaceOrder}=require('../controller/order.controller');

OrderRouter.post('/checkout',isAuth,PlaceOrder);

module.exports=OrderRouter;