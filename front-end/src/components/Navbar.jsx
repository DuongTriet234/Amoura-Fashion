import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>
      {/* Menu desktop */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, idx) => {
          const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={path}
              to={path}
              className="flex flex-col items-center gap-1"
            >
              <p>{names[idx]}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          );
        })}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart-icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Icon to open sidebar */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu-icon"
        />
      </div>

      {/* Overlay */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black/40 z-10"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-20 transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-4 p-4 border-b"
        >
          <img
            src={assets.dropdown_icon}
            className="h-4 rotate-180"
            alt="dropdown-icon"
          />
          <p>Back</p>
        </div>

        <ul className="flex flex-col p-4 gap-2">
          {[
            { path: "/", label: "HOME" },
            { path: "/collection", label: "COLLECTION" },
            { path: "/about", label: "ABOUT" },
            { path: "/contact", label: "CONTACT" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-md text-lg tracking-wide transition-colors duration-200 
         ${
           isActive
             ? "bg-gray-100 font-semibold text-black"
             : "text-gray-700 hover:bg-gray-50"
         }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
