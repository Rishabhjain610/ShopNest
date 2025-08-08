const Product = require("../model/product.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const image4 = await uploadOnCloudinary(req.files.image4[0].path);
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subcategory ||
      !sizes
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(400).json({ message: "All images are required" });
    }
    const newProduct = {
      name,
      description,
      price: Number(price), //converts price to number

      category,
      subcategory,
      sizes: JSON.parse(sizes), //it will accept the string and convert it to an array
      // Convert bestseller to boolean if it's a string
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(newProduct);
    if (!product) {
      return res.status(500).json({ message: "Failed to add product" });
    }
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addProduct };
