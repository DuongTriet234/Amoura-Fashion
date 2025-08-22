import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img
        className="w-[80px] sm:w-[100px]"
        src={assets.logo}
        alt="Amoura Fashion Admin Logo"
      />

      <button
        onClick={() => setToken("")}
        className="cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
