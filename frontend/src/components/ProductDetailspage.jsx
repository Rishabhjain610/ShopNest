import React, { useContext, useState, useEffect } from "react";
import { ShopDataContext } from "../contextapi/ShopContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
const ProductDetailspage = () => {
  const { id } = useParams();
  const { products, currency } = useContext(ShopDataContext);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const products1 = products?.products || [];
    products1.forEach((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage1(item.image1 || "");
        setImage2(item.image2 || "");
        setImage3(item.image3 || "");
        setImage4(item.image4 || "");
        setImage(item.image1 || "");
      }
    });
  }, [id, products]);

  // Collect all available images for thumbnails
  const thumbnails = [image1, image2, image3, image4].filter(Boolean);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <span>Loading...</span>
      </div>
    );
  }

  // Sizes array (from backend it's already parsed as array)
  const sizes = Array.isArray(productData.sizes) ? productData.sizes : [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 px-2 sm:px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Section */}
          <div>
            <div className="bg-gray-900 rounded-3xl border-2 border-blue-700/30 shadow-xl flex items-center justify-center mb-6 min-h-[250px] sm:min-h-[350px]">
              {image && (
                <img
                  src={image}
                  alt={productData.name}
                  className="max-h-[300px] sm:max-h-[400px] w-auto rounded-2xl object-contain transition-all duration-300"
                />
              )}
            </div>
            <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImage(img)}
                  className={`rounded-xl border-2 transition-all duration-200 p-1 sm:p-2 ${
                    image === img
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-700 hover:border-blue-400"
                  }`}
                  style={{ background: "#18181b" }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-200">{productData.name}</h1>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent">
                {currency}{productData.price}
              </span>
              {productData.oldPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {currency}{productData.oldPrice}
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-6 text-base sm:text-lg">{productData.description}</p>
            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-blue-300 font-semibold mb-2">Select Size:</label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200
                        ${selectedSize === size
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-gray-900 border-gray-700 text-blue-200 hover:border-blue-400"}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <div className="mt-2 text-blue-400 text-sm font-medium">
                    Selected Size: {selectedSize}
                  </div>
                )}
              </div>
            )}
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  );
};

export default ProductDetailspage;