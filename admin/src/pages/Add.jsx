import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { FaPlus, FaTimes, FaImage } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [description, setDescription] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const { serverUrl } = useContext(AuthDataContext);
  // Handle size selection/deselection
  const handleSizeToggle = (size) => {
    if (sizes.includes(size)) {
      // Remove size if already selected
      setSizes(sizes.filter((s) => s !== size));
    } else {
      // Add size if not selected
      setSizes([...sizes, size]);
    }
  };

  // Remove specific size
  const handleRemoveSize = (sizeToRemove) => {
    setSizes(sizes.filter((s) => s !== sizeToRemove));
  };

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("description", description);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to JSON string
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      const result = await axios.post(
        `${serverUrl}/api/product/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Add this
          },
        }
      );
      console.log("Product added successfully:", result.data);
      toast.success("Product added successfully!");
      if (result.data.success) {
        // Reset form fields after successful submission
        setName("");
        setPrice("");
        setCategory("Men");
        setSubcategory("Topwear");
        setDescription("");
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="md:ml-60 pt-24 md:pt-20 min-h-screen bg-black p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 shadow-2xl rounded-xl overflow-hidden border border-gray-800">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Add New Product
              </h1>
              <p className="text-blue-100 mt-2">
                Fill in the details below to add a new product to your store
              </p>
            </div>

            <form className="p-6 space-y-8" onSubmit={handleAddProduct}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 hover:border-gray-600"
                      placeholder="Enter product name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price (Rs) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 hover:border-gray-600"
                      placeholder="0.00"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white hover:border-gray-600"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select Category
                      </option>
                      <option value="Men" className="text-white bg-gray-800">
                        Men
                      </option>
                      <option value="Women" className="text-white bg-gray-800">
                        Women
                      </option>
                      <option value="Kids" className="text-white bg-gray-800">
                        Kids
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subcategory *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white hover:border-gray-600"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select Subcategory
                      </option>
                      <option
                        value="Topwear"
                        className="text-white bg-gray-800"
                      >
                        Topwear
                      </option>
                      <option
                        value="Bottomwear"
                        className="text-white bg-gray-800"
                      >
                        Bottomwear
                      </option>
                      <option
                        value="Winterwear"
                        className="text-white bg-gray-800"
                      >
                        Winterwear
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-gray-400 hover:border-gray-600"
                    placeholder="Enter detailed product description..."
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
                  Available Sizes
                </h2>

                {sizes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {sizes.includes("XS") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        XS
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("XS")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {sizes.includes("S") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        S
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("S")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {sizes.includes("M") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        M
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("M")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {sizes.includes("L") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        L
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("L")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {sizes.includes("XL") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        XL
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("XL")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {sizes.includes("XXL") && (
                      <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-500">
                        XXL
                        <button
                          type="button"
                          onClick={() => handleRemoveSize("XXL")}
                          className="ml-2 text-blue-200 hover:text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("XS")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("XS")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    XS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("S")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("S")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    S
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("M")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("M")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    M
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("L")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("L")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    L
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("XL")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("XL")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    XL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeToggle("XXL")}
                    className={`p-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                      sizes.includes("XXL")
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    XXL
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
                  Product Images *
                </h2>
                <p className="text-sm text-gray-400">
                  Upload 4 high-quality images of your product
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <label
                      className="block border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center"
                      htmlFor="image1"
                    >
                      {!image1 ? (
                        <>
                          <FaImage className="text-gray-500 text-3xl mb-2" />
                          <span className="text-sm text-gray-300 font-medium">
                            Image 1
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to upload
                          </span>
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(image1)}
                            alt="Preview 1"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImage1(null)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors border border-gray-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id="image1"
                        className="hidden"
                        onChange={(e) => setImage1(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="relative">
                    <label
                      className="block border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center"
                      htmlFor="image2"
                    >
                      {!image2 ? (
                        <>
                          <FaImage className="text-gray-500 text-3xl mb-2" />
                          <span className="text-sm text-gray-300 font-medium">
                            Image 2
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to upload
                          </span>
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(image2)}
                            alt="Preview 2"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImage2(null)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors border border-gray-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id="image2"
                        className="hidden"
                        onChange={(e) => setImage2(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="relative">
                    <label
                      className="block border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center"
                      htmlFor="image3"
                    >
                      {!image3 ? (
                        <>
                          <FaImage className="text-gray-500 text-3xl mb-2" />
                          <span className="text-sm text-gray-300 font-medium">
                            Image 3
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to upload
                          </span>
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(image3)}
                            alt="Preview 3"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImage3(null)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors border border-gray-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id="image3"
                        className="hidden"
                        onChange={(e) => setImage3(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="relative">
                    <label
                      className="block border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center"
                      htmlFor="image4"
                    >
                      {!image4 ? (
                        <>
                          <FaImage className="text-gray-500 text-3xl mb-2" />
                          <span className="text-sm text-gray-300 font-medium">
                            Image 4
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to upload
                          </span>
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(image4)}
                            alt="Preview 4"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImage4(null)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors border border-gray-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id="image4"
                        className="hidden"
                        onChange={(e) => setImage4(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
                  Additional Options
                </h2>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={bestseller}
                    onChange={(e) => setBestseller(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-300">
                    Mark as Bestseller
                    <span className="text-gray-500 ml-1">
                      (This product will be featured prominently)
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-500">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    Add Product
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
