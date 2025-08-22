import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            product: products.find((product) => product._id === items),
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-12 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <Title text1={"YOUR"} text2={"CART"} />
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Review your selected items before proceeding to checkout
        </p>
      </div>

      <AnimatePresence mode="wait">
        {cartData.length === 0 ? (
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-gray-600 text-lg mb-6">
              Your cart is currently empty.
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="cart-data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-16"
          >
            {/* Product List */}
            <div className="flex-1 space-y-6">
              {cartData.map((item, index) => {
                const productData = item.product;
                if (!productData) return null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-5 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition grid grid-cols-[3fr_1fr_0.5fr] sm:grid-cols-[4fr_1.2fr_0.5fr] items-center gap-6"
                  >
                    {/* Product Info */}
                    <div className="flex items-start gap-6">
                      <img
                        className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-lg border"
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-base sm:text-lg font-medium text-gray-900">
                          {productData.name}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-gray-900 font-semibold">
                            {currency}
                            {productData.price}
                          </p>
                          <span className="px-3 py-1 rounded-full text-sm bg-gray-100 border text-gray-600">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Input */}
                    <input
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        updateQuantity(
                          item._id,
                          item.size,
                          value > 0 ? value : 0
                        );
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-center w-16 focus:ring-2 focus:ring-black/70 outline-none transition"
                      type="number"
                      min={1}
                      value={item.quantity}
                    />

                    {/* Delete Button */}
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="w-5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition"
                      src={assets.bin_icon}
                      alt="Remove"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Cart Total + Checkout */}
            <div className="w-full lg:w-[380px] bg-white border border-gray-100 rounded-2xl shadow-xl p-6 h-fit">
              <CartTotal />
              <div className="border-t border-dashed my-6" />
              <button
                onClick={() => navigate("/place-order")}
                disabled={cartData.length === 0}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  cartData.length === 0
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
