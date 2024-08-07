import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // State untuk menyimpan role pengguna

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
        setUserRole(response.data.role); // Set user role based on session data
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUserRole(null); // Clear user role after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="container-Navbar sticky top-0 w-full z-[999]">
        <div
          className={`content flex m-5 justify-between bg-navbar-color rounded-lg overflow-hidden ${className}`}>
          <div className="Left m-5">
            <h1 className="text-4xl text-color-yellow kodchasan-bold">
              Nongki-Yok
            </h1>
          </div>
          <div className="Right m-5 space-x-8 text-white jura-medium">
            <span className="text-2xl border-l-2 border-white"></span>
            <a href="/" className="">
              Home
            </a>
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
            <a href="#">Contact</a>
            {userRole ? (
  userRole == "User" ? (
    <button
      onClick={handleLogout}
      className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
      Logout
    </button>
  ) : userRole == "Guide" ? (
    <a
      href="/dashboard-guide"
      className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
      Home
    </a>
  ) : userRole == "Admin" ? (
    <a
      href="/dashboard-admin"
      className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
      Home
    </a>
  ) : null
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
    </>
  );
};

export default Navbar;
