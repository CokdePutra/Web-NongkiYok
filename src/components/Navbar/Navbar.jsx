import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isDashboardPage =
    location.pathname === "/dashboard" ||
    location.pathname === "/Admin";
  const isAdminPage = location.pathname === "/Admin";
  return (
    <div className="sticky top-0 w-full z-[999] bg-navbar-color">
      <div
        className={`flex justify-between items-center p-5 rounded-lg ${className}`}>
        
        {/* Left Section */}
        <h1 className="text-4xl text-color-yellow kodchasan-bold">
          Nongki-Yok
        </h1>
        
        {/* Right Section */}
        <div className="flex items-center text-lg space-x-8 text-white jura-medium">
          {user && (
            <span>Hai, <strong className="capitalize">{user.name}</strong></span>
          )}
          <span className="border-l-2 border-white">
          <a href="/" className="ml-3">Home</a>
          </span>
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none">
            Location
            {dropdownOpen && (
              <div className="absolute mt-3 ml-[-70%] w-48 bg-white rounded-md shadow-lg z-10">
                <a
                  href="/homecard"
                  className="block rounded-md  px-4 py-2 text-gray-800 hover:bg-gray-200">
                  List Location
                </a>
                <a
                  href="/map"
                  className="block rounded-md  px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Map
                </a>
              </div>
            )}
          </button>
          <a href="/Contact">Contact</a>
          <a href="" className="flex items-center">
            <img
              src="./img/Card/AI.png"
              alt="AI"
              className="h-7 w-7 object-cover"
            />
          </a>
          {user ? (
            isDashboardPage &&
            (user.role === "Guide" ||
              user.role === "Admin" ||
              user.role === "User") ? (
              <button
                onClick={handleLogout}
                className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
                Logout
              </button>
            ) : user.role === "Guide" || user.role === "User" ? (
              <a
                href="/dashboard"
                className="bg-button-gray hover:bg-color-primary text-white py-3 px-4 rounded-lg">
                Dashboard
              </a>
            ) : user.role === "Admin" ? (
              <a
                href="/Admin"
                className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
                Dashboard
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
                Logout
              </button>
            )
          ) : (
            <a
              href="/login"
              className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
