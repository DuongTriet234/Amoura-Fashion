import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10)); // Get top 10 products
    }
  }, [products]);

  return (
    <section className="my-10">
      {/* Heading */}
      <div className="text-center py-8">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover the latest collection from Amoura Fashion – where timeless
          elegance meets modern trends. Each design is carefully crafted to
          celebrate your beauty and express your unique style.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
