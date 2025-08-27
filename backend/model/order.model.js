const mongoose=require("mongoose");
const { Schema, model } = mongoose;
const orderSchema=new Schema({
  userId:{
    type:String,
    required:true
  },
  items:{
    type:Array,
    required:true

  },
  amount:{
    type:Number,
    required:true
  },
  address:{
    type:Object,
    required:true
  },
  status:{
    type:String,
    default:"order placed",
    enum:["order placed","shipped","delivered","cancelled"]
  },
  paymentMethod:{
    type:String,
    required:true
  },
  payment:{
    type:Boolean,
    required:true,
    default:false
  },
  date:{
    type:Number,
    required:true
  }


},{
  timestamps:true
})
module.exports=model("Order",orderSchema);