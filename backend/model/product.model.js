const mongoose= require("mongoose");
const { Schema, model } = mongoose;
const productSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  image1:{
    type: String,
    required: true,
    trim: true,

  },
  image2:{
    type: String,
    required: true,
    trim: true,
  },
  image3:{
    type: String,
    required: true,
    trim: true,
  },
  image4:{
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    required: true,
    trim: true,
  },
  price:{
    type: Number,
    required: true,
  },
  category:{
    type: String,
    required: true,
    trim: true,
  },
  subcategory:{
    type: String,
    required: true,
    trim: true,
  },
  sizes:{
    type: Array,
    required: true,
  },
  date:{
    type: Number,
    required:true,
  },
  bestseller:{
    type: Boolean,
    default: false,
  }
},{
  timestamps: true,
  minimize: false, // Keeps empty objects in the database
});





module.exports = model("Product", productSchema);