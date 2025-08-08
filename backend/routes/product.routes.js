const { addProduct } = require("../controller/product.controller");
const express = require("express");
const ProductRouter = express.Router();
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

module.exports = ProductRouter;
