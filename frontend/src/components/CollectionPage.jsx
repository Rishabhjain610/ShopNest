import React, { useState, useEffect, useContext } from "react";
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList } from "react-icons/fi";
import { ShopDataContext } from "../contextapi/ShopContext";
import Card from "./Card";

const CollectionPage = () => {
  const { products, search, showSearch } = useContext(ShopDataContext);
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Filter states
  const [sortType, setSortType] = useState("relevant");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showCategories, setShowCategories] = useState(true);
  const [showSubCategories, setShowSubCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // Categories and subcategories
  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  const applyFilters = () => {
    if (!products || !products.products || !Array.isArray(products.products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products.products];
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.subcategory.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subcategory)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sorting
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = (e) => {
    setSortType(e.target.value);
  };

  // Initialize products when they load
  useEffect(() => {
    if (products && products.products && Array.isArray(products.products)) {
      setFilteredProducts(products.products);
    }
  }, [products]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [products, category, subCategory, sortType, priceRange, search]);

  const clearFilters = () => {
    setSortType("relevant");
    setCategory([]);
    setSubCategory([]);
    setPriceRange([0, 10000]);
  };

  const activeFiltersCount =
    category.length +
    subCategory.length +
    (sortType !== "relevant" ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 10000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Mobile Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-xl border-r border-gray-700 transform ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out lg:hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                <FiFilter className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Filter Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Sort By */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-white flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                Sort By
              </h3>
              <select
                value={sortType}
                onChange={sortProducts}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              >
                <option value="relevant">Most Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between w-full text-base font-semibold mb-3 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                  Categories
                  {category.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {category.length}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-300 group-hover:text-blue-400 ${
                    showCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategories && (
                <div className="space-y-3 pl-4 animate-in slide-in-from-top duration-200">
                  {categories.map((categoryItem, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group hover:bg-gray-800/30 rounded-lg p-2 transition-all"
                    >
                      <input
                        type="checkbox"
                        value={categoryItem}
                        checked={category.includes(categoryItem)}
                        onChange={toggleCategory}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-lg border-2 mr-3 transition-all flex items-center justify-center ${
                          category.includes(categoryItem)
                            ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/25"
                            : "border-gray-500 group-hover:border-gray-400"
                        }`}
                      >
                        {category.includes(categoryItem) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-300 text-base capitalize group-hover:text-white transition-colors flex items-center gap-2">
                        <span className="text-lg">
                          {categoryItem === "Men" && "👨"}
                          {categoryItem === "Women" && "👩"}
                          {categoryItem === "Kids" && "👶"}
                        </span>
                        {categoryItem}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sub Categories */}
            <div>
              <button
                onClick={() => setShowSubCategories(!showSubCategories)}
                className="flex items-center justify-between w-full text-base font-semibold mb-3 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                  Sub Categories
                  {subCategory.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {subCategory.length}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-300 group-hover:text-blue-400 ${
                    showSubCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSubCategories && (
                <div className="space-y-3 pl-4 animate-in slide-in-from-top duration-200">
                  {subCategories.map((subCategoryItem, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group hover:bg-gray-800/30 rounded-lg p-2 transition-all"
                    >
                      <input
                        type="checkbox"
                        value={subCategoryItem}
                        checked={subCategory.includes(subCategoryItem)}
                        onChange={toggleSubCategory}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-lg border-2 mr-3 transition-all flex items-center justify-center ${
                          subCategory.includes(subCategoryItem)
                            ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/25"
                            : "border-gray-500 group-hover:border-gray-400"
                        }`}
                      >
                        {subCategory.includes(subCategoryItem) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-300 text-base capitalize group-hover:text-white transition-colors flex items-center gap-2">
                        <span className="text-lg">
                          {subCategoryItem === "Topwear" && "👕"}
                          {subCategoryItem === "Bottomwear" && "👖"}
                          {subCategoryItem === "Winterwear" && "🧥"}
                        </span>
                        {subCategoryItem}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => setShowPrice(!showPrice)}
                className="flex items-center justify-between w-full text-base font-semibold mb-3 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                  Price Range
                  {(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ₹{priceRange[0]}-₹{priceRange[1]}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-300 group-hover:text-blue-400 ${
                    showPrice ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showPrice && (
                <div className="space-y-4 pl-4 animate-in slide-in-from-top duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Min Price
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Max Price
                      </label>
                      <input
                        type="number"
                        placeholder="10000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 10000,
                          ])
                        }
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>₹0</span>
                      <span>₹{priceRange[1]}</span>
                      <span>₹10000+</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters - Bottom */}
          <div className="p-6 border-t border-gray-700 bg-gray-800/50">
            <button
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                activeFiltersCount > 0
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Clear All Filters{" "}
              {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-xl border-r border-gray-700 h-screen fixed left-0 top-0 z-40">
        <div className="h-full flex flex-col">
          {/* Desktop Header */}
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <FiFilter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Filters</h2>
                  <p className="text-sm text-gray-400">Refine your search</p>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
          </div>

          {/* Desktop Filter Content */}
          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            {/* Sort By */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                Sort By
              </h3>
              <select
                value={sortType}
                onChange={sortProducts}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              >
                <option value="relevant">Most Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  Categories
                  {category.length > 0 && (
                    <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      {category.length}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-6 h-6 transition-transform duration-300 group-hover:text-blue-400 ${
                    showCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategories && (
                <div className="space-y-4 pl-4 animate-in slide-in-from-top duration-200">
                  {categories.map((categoryItem, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group hover:bg-gray-800/30 rounded-xl p-3 transition-all"
                    >
                      <input
                        type="checkbox"
                        value={categoryItem}
                        checked={category.includes(categoryItem)}
                        onChange={toggleCategory}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-xl border-2 mr-4 transition-all flex items-center justify-center ${
                          category.includes(categoryItem)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 shadow-lg shadow-blue-500/25"
                            : "border-gray-500 group-hover:border-gray-400"
                        }`}
                      >
                        {category.includes(categoryItem) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-300 text-lg capitalize group-hover:text-white transition-colors flex items-center gap-3">
                        <span className="text-2xl">
                          {categoryItem === "Men" && "👨"}
                          {categoryItem === "Women" && "👩"}
                          {categoryItem === "Kids" && "👶"}
                        </span>
                        {categoryItem}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sub Categories */}
            <div>
              <button
                onClick={() => setShowSubCategories(!showSubCategories)}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  Sub Categories
                  {subCategory.length > 0 && (
                    <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      {subCategory.length}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-6 h-6 transition-transform duration-300 group-hover:text-blue-400 ${
                    showSubCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSubCategories && (
                <div className="space-y-4 pl-4 animate-in slide-in-from-top duration-200">
                  {subCategories.map((subCategoryItem, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group hover:bg-gray-800/30 rounded-xl p-3 transition-all"
                    >
                      <input
                        type="checkbox"
                        value={subCategoryItem}
                        checked={subCategory.includes(subCategoryItem)}
                        onChange={toggleSubCategory}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-xl border-2 mr-4 transition-all flex items-center justify-center ${
                          subCategory.includes(subCategoryItem)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 shadow-lg shadow-blue-500/25"
                            : "border-gray-500 group-hover:border-gray-400"
                        }`}
                      >
                        {subCategory.includes(subCategoryItem) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-300 text-lg capitalize group-hover:text-white transition-colors flex items-center gap-3">
                        <span className="text-2xl">
                          {subCategoryItem === "Topwear" && "👕"}
                          {subCategoryItem === "Bottomwear" && "👖"}
                          {subCategoryItem === "Winterwear" && "🧥"}
                        </span>
                        {subCategoryItem}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => setShowPrice(!showPrice)}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  Price Range
                  {(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                    <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      ₹{priceRange[0]}-₹{priceRange[1]}
                    </span>
                  )}
                </div>
                <FiChevronDown
                  className={`w-6 h-6 transition-transform duration-300 group-hover:text-blue-400 ${
                    showPrice ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showPrice && (
                <div className="space-y-6 pl-4 animate-in slide-in-from-top duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-medium">
                        Min Price
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-medium">
                        Max Price
                      </label>
                      <input
                        type="number"
                        placeholder="10000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 10000,
                          ])
                        }
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-400 font-medium">
                      <span>₹0</span>
                      <span className="text-blue-400 font-bold">
                        ₹{priceRange[1]}
                      </span>
                      <span>₹10000+</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters - Bottom */}
          <div className="p-6 border-t border-gray-700 bg-gray-800/50">
            <button
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                activeFiltersCount > 0
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Clear All Filters{" "}
              {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  All Products
                </h1>
                <p className="text-gray-400 text-base lg:text-lg">
                  Showing{" "}
                  <span className="text-blue-400 font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-white font-semibold">
                    {products?.products?.length || 0}
                  </span>{" "}
                  products
                  {activeFiltersCount > 0 && (
                    <span className="text-sm text-gray-500 block mt-1">
                      with {activeFiltersCount} filter
                      {activeFiltersCount > 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-gray-800/50 p-1 rounded-xl border border-gray-700">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="lg:hidden flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <FiFilter className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {activeFiltersCount > 0 && (
          <div className="px-6 lg:px-8 py-4 bg-gray-800/30 border-b border-gray-700">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-400 font-medium">
                Active filters:
              </span>
              {category.map((cat) => (
                <span
                  key={cat}
                  className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                >
                  {cat}
                </span>
              ))}
              {subCategory.map((subCat) => (
                <span
                  key={subCat}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30"
                >
                  {subCat}
                </span>
              ))}
              {(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-500/30">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              )}
              {sortType !== "relevant" && (
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm border border-pink-500/30">
                  Sort:{" "}
                  {sortType === "low-high"
                    ? "Price ↑"
                    : sortType === "high-low"
                    ? "Price ↓"
                    : "Newest"}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="p-6 lg:p-8">
          {filteredProducts && filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  className="animate-in fade-in duration-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Card
                    name={item.name}
                    image={item.image1 || item.image}
                    id={item._id || item.id}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 lg:py-32">
              <div className="max-w-md mx-auto">
                <div className="text-8xl lg:text-9xl mb-8 animate-bounce">
                  {activeFiltersCount > 0 ? "📝" : "📦"}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {activeFiltersCount > 0
                    ? "No products match your filters"
                    : "No products available"}
                </h3>
                <p className="text-gray-400 mb-8 text-lg max-w-sm mx-auto leading-relaxed">
                  {!products || !products.products
                    ? "Loading products..."
                    : activeFiltersCount > 0
                    ? "Try adjusting your filters to see more products."
                    : "Products will appear here when available."}
                </p>
                {products && products.products && activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {showFilter && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .slider::-webkit-slider-track {
          background: linear-gradient(90deg, #374151, #3b82f6);
          border-radius: 8px;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CollectionPage;
