import React from "react";
import Swal from "sweetalert2";

const NewsletterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., sending the email to a server
    Swal.fire({
      title: "Thank you for subscribing!",
      text: "You'll now receive our latest updates.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our fashion community and be the first to know about new arrivals,
        exclusive offers, and style tips.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
