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
    res.status(500).json({ message: "adding product server error" });
  }
};

const ListProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "listing products server error" });
  }
};
const getById=async(req,res)=>{
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product by ID" });
    
  }
}
const editListing = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !description || !price || !category || !subcategory || !sizes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Handle image uploads properly
    let image1, image2, image3, image4;
    
    try {
      if (req.files?.image1) {
        image1 = await uploadOnCloudinary(req.files.image1[0].path);
      }
      if (req.files?.image2) {
        image2 = await uploadOnCloudinary(req.files.image2[0].path);
      }
      if (req.files?.image3) {
        image3 = await uploadOnCloudinary(req.files.image3[0].path);
      }
      if (req.files?.image4) {
        image4 = await uploadOnCloudinary(req.files.image4[0].path);
      }
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      return res.status(500).json({ message: "Failed to upload images" });
    }

    // Build update object - only include image fields if new images uploaded
    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
    };

    // Only add image fields if new images were uploaded
    if (image1) updateData.image1 = image1;
    if (image2) updateData.image2 = image2;
    if (image3) updateData.image3 = image3;
    if (image4) updateData.image4 = image4;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Edit listing error:", error);
    res.status(500).json({ message: "Error editing listing" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "deleting product server error" });
  }
};

module.exports = { addProduct, ListProduct, deleteProduct, editListing, getById };
