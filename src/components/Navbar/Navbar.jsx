import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = ({ className }) => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
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
        `${baseURL}/logout`,
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
    location.pathname === "/dashboard" || location.pathname === "/Admin";
  const isAdminPage = location.pathname === "/Admin" || location.pathname === "/ListContact";
  const isuserPage = location.pathname === "/dashboard";

  return (
    <div className="sticky top-0 w-full px-10 py-5 z-[999]">
      <div
        className={`flex justify-between items-center p-5 rounded-lg bg-navbar-color ${className}`}>
        {/* Left Section */}
        <h1 className="text-4xl text-color-yellow kodchasan-bold">
          Nongki-Yok
        </h1>

        {/* Hamburger Button for Mobile */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {/* Icon Hamburger */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Right Section (Hidden on mobile, visible on larger screens) */}
        <div className="hidden md:flex items-center text-lg space-x-8 text-white jura-medium">
          {user && (
            <span>
              Hai, <strong className="capitalize">{user.name}</strong>
            </span>
          )}
          <span className="border-l-2 border-white">
            <a href="/" className="ml-3">
              Home
            </a>
          </span>
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none">
            Location
            {dropdownOpen && (
              <div className="absolute mt-3 ml-[-70%] w-48 bg-white rounded-md shadow-lg z-10">
                <a
                  href="/homecard"
                  className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200">
                  List Location
                </a>
                <a
                  href="/map"
                  className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Map
                </a>
              </div>
            )}
          </button>
          {isAdminPage ? (
            <a href="/ListContact">Contact List</a>
          ) : isuserPage && user && user.role === "User" ? (
            <a href="/GuideRequest">Daftar Guide</a>
          ) : !isuserPage && !isAdminPage && (
            <a href="/Contact">Contact</a>
          )}

          {isAdminPage && user && user.role === "Admin" && (
            <a href="/Dashboard">Guide Dahboard</a>
          )}

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

        {/* Mobile Menu (Visible on smaller screens) */}
        {mobileMenuOpen && (
  <div className="md:hidden bg-navbar-color text-white mt-3 rounded-lg space-y-2 flex flex-col">
    <a href="/" className="py-2 px-4 border-b border-gray-700 text-center">Home</a>
    <a href="/homecard" className="py-2 px-4 border-b border-gray-700 text-center">List Location</a>
    <a href="/map" className="py-2 px-4 border-b border-gray-700 text-center">Map</a>
    {isAdminPage && (
      <a href="/ListContact" className="py-2 px-4 border-b border-gray-700 text-center">Contact List</a>
    )}
    {!isAdminPage && (
      <a href="/Contact" className="py-2 px-4 border-b border-gray-700 text-center">Contact</a>
    )}
    {user && (
      <>
        {user.role === "Guide" || user.role === "User" ? (
          <a href="/dashboard" className="py-2 px-4 border-b border-gray-700 text-center">Dashboard</a>
        ) : user.role === "Admin" ? (
          <a href="/Admin" className="py-2 px-4 border-b border-gray-700 text-center">Dashboard</a>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg text-center block">
            Logout
          </button>
        )}
      </>
    )}
  </div>
)}



      </div>
    </div>
  );
};

export default Navbar;
