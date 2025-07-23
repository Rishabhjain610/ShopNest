const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false, // Keeps empty objects in the database
  }
);

module.exports = model("User", userSchema);
