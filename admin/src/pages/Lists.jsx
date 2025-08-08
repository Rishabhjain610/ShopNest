import React, { useState, useEffect, useContext } from 'react';
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { AuthDataContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

const Lists = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true
      });
      if (response.data.success) {
        setProducts(response.data.products || []);
      } else {
        toast.error('please add product');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${serverUrl}/api/product/delete/${productId}`, {
        withCredentials: true
      });
      if(response.data.success) {
        toast.success('Product deleted successfully');
        setProducts(products.filter(product => product._id !== productId));
      }
      else{
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  // Edit product - navigate to Add page with product ID
  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`);
  };

  const currency = (v) => {
    const n = Number(v || 0);
    if (Number.isNaN(n)) return '₹0';
    return `₹${n.toLocaleString()}`;
  };

  const CategoryPill = ({ cat }) => {
    const c = (cat || '').toLowerCase();
    const styles =
      c === 'men'
        ? 'bg-blue-600/15 text-blue-300'
        : c === 'women'
        ? 'bg-pink-600/15 text-pink-300'
        : 'bg-yellow-600/15 text-yellow-300';
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${styles}`}>
        {cat || 'Unisex'}
      </span>
    );
  };

  return (
    <>
      <Sidebar />

      <div className="md:ml-60 pt-24 md:pt-20 min-h-screen bg-black p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 mb-5 shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Products</h1>
                  <p className="text-blue-100 text-sm mt-0.5">Total: {products.length}</p>
                </div>
                <button
                  onClick={() => navigate('/add')}
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <FaPlus />
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 md:p-5 shadow-xl">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-white">Loading products...</div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Products</h3>
                <p className="text-gray-500 mb-6">Add your first product to get started.</p>
                <button
                  onClick={() => navigate('/add')}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Add Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="relative bg-gray-800/70 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
                  >
                    
                    <div className="h-40 bg-gray-700">
                      {product?.image1 ? (
                        <img
                          src={product.image1}
                          alt={product.name || 'Product'}
                          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-gray-400 text-3xl">
                          📷
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 pb-14">
                      <h3 className="font-semibold text-white text-base mb-1 truncate">
                        {product?.name || 'Untitled'}
                      </h3>
                      <div className="text-green-400 font-bold text-lg mb-3">
                        {currency(product?.price)}
                      </div>
                      <div className="flex justify-start">
                        <CategoryPill cat={product?.category} />
                      </div>
                    </div>

                    {/* Actions - bottom-right */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-lg"
                        title="Edit"
                        aria-label={`Edit ${product?.name}`}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-lg"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lists;