import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showAll, setShowAll] = useState(false);

  const reviews = [
    {
      id: 1,
      user: "Jane D.",
      text: "Absolutely love this product! The quality is amazing and it looks even better in person.",
    },
    {
      id: 2,
      user: "Mark T.",
      text: "Fast delivery and great service. Will definitely buy again.",
    },
    {
      id: 3,
      user: "Lisa K.",
      text: "The material feels very premium. Fits perfectly!",
    },
    {
      id: 4,
      user: "David P.",
      text: "Good value for the price. Highly recommend!",
    },
    {
      id: 5,
      user: "Sophia R.",
      text: "Excellent customer service and quick shipping.",
    },
  ];

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);

        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 smL:gap-12 flex-col sm:flex-row ">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item === size
                      ? "bg-gray-200 text-black border-orange-500"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Reviews Sections */}
      <div className="mt-20">
        {/* Tabs Header */}
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm font-medium transition ${
              activeTab === "description"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm font-medium transition ${
              activeTab === "reviews"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>

        {/* Tabs Content */}
        <div className="border px-6 py-6 text-sm text-gray-600 leading-relaxed bg-gray-50">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p>
                Crafted with premium-quality materials, this product is designed
                to provide both comfort and durability. Perfect for daily use
                and styled to suit modern trends.
              </p>
              <p>
                Each item undergoes strict quality control to ensure it meets
                our high standards, giving you confidence in every purchase.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <p className="font-medium">⭐ 4.8 out of 5</p>
              <p>
                “Absolutely love this product! The quality is amazing and it
                looks even better in person.” – Jane D.
              </p>
              <p>
                “Fast delivery and great service. Will definitely buy again.” –
                Mark T.
              </p>
              <p className="text-gray-400 text-xs">
                Showing 1-2 of 122 reviews.{" "}
                <span className="underline cursor-pointer">View all</span>
              </p>
            </div>
          )}
        </div>
        {/* Display related Products */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
