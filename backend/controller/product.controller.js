const Product = require("../model/product.model");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

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
    const image1 = await uploadOnCloudinary(req.files.image1[0].Path);
    const image2 = await uploadOnCloudinary(req.files.image2[1].Path);
    const image3 = await uploadOnCloudinary(req.files.image3[2].Path);
    const image4 = await uploadOnCloudinary(req.files.image4[3].Path);
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
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
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
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addProduct };
