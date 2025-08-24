import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        // API Calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
      console.log(orderItems);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-10 pt-8 min-h-[80vh] border-t bg-gray-100 px-4 sm:px-10"
    >
      {/* Left Side - Delivery Form */}
      <div className="w-full sm:max-w-[520px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <Title text1={"DELIVERY"} text2={" INFORMATION"} />
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
              type="email"
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
              type="text"
              placeholder="123 Main Street"
            />
          </div>

          {/* City & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="Ho Chi Minh"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="Tan Phu"
              />
            </div>
          </div>

          {/* Zip & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="10001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
                type="text"
                placeholder="Viet Nam"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              className="border border-gray-300 rounded-lg py-2.5 px-3 w-full focus:ring-2 focus:ring-black outline-none transition"
              type="tel"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Order Summary + Payment */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <CartTotal />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <Title text1={"PAYMENT"} text2={" METHOD"} />

          <div className="flex flex-col lg:flex-row gap-4 mt-5">
            {[
              { id: "stripe", logo: assets.stripe_logo, label: "Stripe" },
              { id: "razorpay", logo: assets.razorpay_logo, label: "Razorpay" },
              { id: "cod", logo: null, label: "Cash on Delivery" },
            ].map((option) => (
              <div
                key={option.id}
                onClick={() => setMethod(option.id)}
                className={`flex items-center gap-3 border rounded-lg p-3 px-4 cursor-pointer transition ${
                  method === option.id
                    ? "border-black shadow-md"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === option.id ? "bg-black" : "bg-white"
                  }`}
                ></div>
                {option.logo ? (
                  <img className="h-5" src={option.logo} alt={option.label} />
                ) : (
                  <p className="text-gray-700 text-sm font-medium">
                    {option.label}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-10 py-3 rounded-lg font-medium text-sm transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
