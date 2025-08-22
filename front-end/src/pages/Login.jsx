import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(
          currentState === "Sign Up"
            ? "Registration successful!"
            : "Login successful!"
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // ✅ lấy message từ backend
      } else {
        toast.error(error.message || "Request failed");
      }
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="flex justify-center items-start bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {currentState}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {currentState === "Login"
              ? "Welcome back! Please login to continue."
              : "Create a new account to get started."}
          </p>
          <div className="w-12 h-1 bg-black mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Name input (only in Sign Up) */}
        {currentState === "Sign Up" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black transition"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black transition"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            autoComplete={
              currentState === "Login" ? "current-password" : "new-password"
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black transition"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Links */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p className="cursor-pointer hover:underline">
            Forgot your password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-black font-medium hover:underline"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-black font-medium hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-medium shadow hover:bg-gray-800 transition"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
