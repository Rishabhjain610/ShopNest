
import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { ShopDataContext } from "../contextapi/ShopContext";

const Cart = () => {
  const { cartItem, products, currency, updatequantity, getCartAmount } =
    useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const delivery_fees = 40; // Fixed delivery fee
  const navigate = useNavigate();
  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item].quantity > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item].quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  useEffect(() => {
    setCartAmount(getCartAmount());
  }, [cartItem, getCartAmount]);

  const grandTotal = cartAmount > 0 ? cartAmount + delivery_fees : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-300 mb-8 sm:mb-10 text-center drop-shadow-lg">
          Your Cart
        </h1>

        {cartData.length > 0 ? (
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 shadow-2xl mt-6 sm:mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b border-blue-700/30 bg-gradient-to-r from-blue-900/30 to-blue-700/10">
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Product</th>
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Size</th>
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Price</th>
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Quantity</th>
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Subtotal</th>
                    <th className="py-2 px-1 sm:py-3 sm:px-2 text-blue-300 font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, idx) => {
                    const productData = products.products.find(
                      (product) => product._id === item._id
                    );
                    return (
                      <tr
                        key={idx}
                        className="border-b border-gray-800 hover:bg-gray-800 transition-all"
                      >
                        <td className="py-2 px-1 sm:py-4 sm:px-2 flex items-center gap-2 sm:gap-4">
                          <img
                            src={productData.image1}
                            alt={productData.name}
                            className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg border-2 border-blue-700/30 shadow-md"
                          />
                          <span className="font-semibold text-blue-200 text-base sm:text-lg">
                            {productData.name}
                          </span>
                        </td>
                        <td className="py-2 px-1 sm:py-4 sm:px-2 text-blue-400 font-bold text-center">
                          {item.size}
                        </td>
                        <td className="py-2 px-1 sm:py-4 sm:px-2 text-center">
                          <span className="bg-blue-700/20 px-2 py-1 sm:px-3 sm:py-1 rounded-lg font-semibold">
                            {currency}{productData.price}
                          </span>
                        </td>
                        <td className="py-2 px-1 sm:py-4 sm:px-2 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              e.target.value === ' ' || e.target.value === '0'
                                ? null
                                : updatequantity(
                                    item._id,
                                    item.size,
                                    parseInt(e.target.value)
                                  )
                            }
                            className="w-12 sm:w-16 px-2 py-1 rounded bg-gray-800 text-white border border-blue-700/30 text-center"
                          />
                        </td>
                        <td className="py-2 px-1 sm:py-4 sm:px-2 font-bold text-blue-300 text-center">
                          {currency}{productData.price * item.quantity}
                        </td>
                        <td className="py-2 px-1 sm:py-4 sm:px-2 text-center">
                          <button
                            onClick={() => updatequantity(item._id, item.size, 0)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full transition-all duration-200 bg-red-900/20"
                            title="Remove from cart"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Bill Styled Amount Section */}
            <div className="flex justify-center mt-8">
              <div className="bg-white/10 border border-blue-700/30 rounded-xl px-4 py-6 sm:px-10 sm:py-8 shadow-xl w-full max-w-md">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">Bill Summary</h2>
                <div className="flex justify-between items-center mb-2 sm:mb-4 text-base sm:text-lg">
                  <span className="text-blue-200">Cart Total</span>
                  <span className="font-bold text-blue-100">{currency}{cartAmount}</span>
                </div>
                <div className="flex justify-between items-center mb-2 sm:mb-4 text-base sm:text-lg">
                  <span className="text-blue-200">Delivery Charges</span>
                  <span className="font-bold text-blue-100">{currency}{delivery_fees}</span>
                </div>
                <div className="border-t border-blue-700/30 my-2 sm:my-4"></div>
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                  <span className="text-blue-300">Grand Total</span>
                  <span className="text-blue-100">{currency}{grandTotal}</span>
                </div>
              </div>
            </div>
            {/* Centered Proceed to Checkout Button */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-base sm:text-lg"
              onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center text-blue-200 shadow-2xl mt-10 sm:mt-16">
            <p className="text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold">Your cart is empty.</p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-base sm:text-lg shadow"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;