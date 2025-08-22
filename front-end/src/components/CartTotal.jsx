import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full sm:w-[380px] bg-white rounded-2xl shadow-xl p-6 border border-gray-100 ml-auto">
      {/* Title */}
      <div className="text-xl font-semibold text-gray-800 mb-6 text-center">
        <Title text1="CART" text2="TOTAL" />
      </div>

      {/* Price Details */}
      <div className="flex flex-col gap-4 text-gray-700 text-sm">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            {currency}
            {subtotal}.00
          </span>
        </div>
        <div className="border-t border-dashed" />

        <div className="flex justify-between items-center">
          <span>Shipping Fee</span>
          <span className="font-medium text-gray-900">
            {currency}
            {delivery_fee}.00
          </span>
        </div>
        <div className="border-t border-dashed" />

        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-800">Total</span>
          <span className="text-black text-xl">
            {currency}
            {total}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
