import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch session data on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        setUser(response.data); // Set user data based on session data
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
      setUser(null); // Clear user data after logout
      window.location.href = "/"; // Redirect to home after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isDashboardPage =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard-admin";

  return (
    <div className="container-Navbar sticky top-0 w-full z-[999]">
      <div
        className={`content flex m-5 justify-between bg-navbar-color rounded-lg overflow-hidden ${className}`}>
        <div className="Left m-5">
          <h1 className="text-4xl text-color-yellow kodchasan-bold">
            Nongki-Yok
          </h1>
        </div>
        <div className="Right m-5 space-x-8 text-white jura-medium">
          {user ? (
            <>
              <span>Hai, <strong className="capitalize">{user.name}</strong></span>
              <span className="text-2xl border-l-2 border-white"></span>
            </>
          ) : (
            <a></a>
          )}
          <a href="/">Home</a>
          <button onClick={toggleDropdown} className="focus:outline-none">
            Location
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a
                href="/homecard"
                className="rounded-md block px-4 py-2 text-gray-800 hover:bg-gray-200">
                List Location
              </a>
              <a
                href="/map"
                className="rounded-md block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Map
              </a>
            </div>
          )}
          <a href="/Contact">Contact</a>
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
                className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
                Home
              </a>
            ) : user.role === "Admin" ? (
              <a
                href="/dashboard-admin"
                className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
                Home
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
