import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // Image states
  const [images, setImages] = useState([false, false, false, false]);

  // Product states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  // setLoading when upload product to server
  const [loading, setLoading] = useState(false);
  // Handle image change
  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  // Toggle sizes
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  // Submit product
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImages([false, false, false, false]);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-5 p-6 bg-white shadow rounded-lg"
    >
      {/* Upload Images */}
      <div className="w-full">
        <p className="mb-3 font-medium">Upload Product Images</p>
        <div className="flex gap-3 flex-wrap">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer"
            >
              <img
                className="w-24 h-24 object-cover border border-gray-300 rounded-md bg-white"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="Upload"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
          type="text"
          placeholder="Type product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
          placeholder="Write product details"
          rows={4}
          required
        />
      </div>

      {/* Category - SubCategory - Price */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="flex-1">
          <p className="mb-2 font-medium">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2 font-medium">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex-1 sm:w-[120px]">
          <p className="mb-2 font-medium">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-medium">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`border px-4 py-2 rounded-md cursor-pointer transition ${
                sizes.includes(size)
                  ? "bg-pink-100 border-pink-400"
                  : "bg-gray-100 hover:bg-pink-50"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-32 py-3 mt-4 bg-black hover:bg-pink-600 text-white rounded-md transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
