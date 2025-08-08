const { addProduct,deleteProduct,ListProduct,editListing,getById } = require("../controller/product.controller");
const express = require("express");
const ProductRouter = express.Router();
const adminAuth= require("../middleware/adminAuth");
const upload =require("../middleware/multer");
ProductRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
ProductRouter.get("/list", ListProduct);
ProductRouter.put("/edit/:id", adminAuth, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]), editListing);
ProductRouter.get("/get/:id",adminAuth, getById);
ProductRouter.delete("/delete/:id", adminAuth, deleteProduct);

module.exports = ProductRouter;
