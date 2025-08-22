import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
        // Filter products based on category and subCategory
      productsCopy = productsCopy.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      setRelated(productsCopy);
    }
  }, [products, category, subCategory]);

  const visibleProducts = showAll ? related : related.slice(0, 4);

  return (
    <div className="my-16">
      <hr className="mb-10 border-gray-200" />
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED "} text2={"PRODUCTS"} />
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Explore similar products you may like
        </p>
      </div>

      {related.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {visibleProducts.map((item) => (
              <div
                key={item._id}
                className="transition-transform duration-200 hover:scale-105"
              >
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>

          {/* View More / View Less */}
          {related.length > 4 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center text-sm mt-6">
          No related products found.
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
