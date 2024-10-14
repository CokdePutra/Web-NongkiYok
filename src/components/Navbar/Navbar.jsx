import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = ({ className }) => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State untuk mobile menu
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen); // Toggle untuk mobile menu
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
      await axios.post(`${baseURL}/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isDashboardPage =
    location.pathname === "/dashboard" || location.pathname === "/Admin";
  const isAdminPage =
    location.pathname === "/Admin" || location.pathname === "/ListContact";
  const isuserPage = location.pathname === "/dashboard";
  const IsLocation = location.pathname === "/homecard";
  const pathParts = location.pathname.split("/");
  const isDetailLocation =
    pathParts[1] === "DetailLocation" && !isNaN(pathParts[2]);
  return (
    <div className="sticky top-0 w-full z-[999]">
      {/* Tambahkan kondisi untuk menyembunyikan navbar saat mobile menu terbuka */}
      <div
        className={`${
          mobileMenuOpen ? "hidden" : "block" // Navbar tersembunyi saat mobileMenuOpen true
        } px-10 py-5`}
      >
        <div
          className={`flex justify-between items-center p-5 rounded-lg bg-navbar-color ${className}`}
        >
          {/* Left Section */}
          <a href="/">
            <h1 className="text-4xl text-color-yellow kodchasan-bold">
              Nongki-Yok
            </h1>
          </a>
          {/* Hamburger Button for Mobile */}
          <button
            className="block lg:hidden text-white focus:outline-none hover:text-color-gold-card"
            onClick={toggleMobileMenu} // Saat ditekan, mobile menu akan muncul
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
          <div className="hidden lg:flex items-center text-lg space-x-7 text-white jura-medium text">
            {user && (
              <span>
                Hai, <strong className="capitalize">{user.name}</strong>
              </span>
            )}
            <span className="border-l-2 border-white">
              <a href="/" className="ml-3 flex items-center space-x-2">
                <box-icon name="home" color="#ffffff"></box-icon>
                <span>Home</span>
              </a>
            </span>
            <button
              onClick={toggleDropdown}
              className="relative focus:outline-none flex items-center space-x-2"
            >
              <box-icon name="map-pin" color="#ffffff"></box-icon>
              <span>Location</span>
              {dropdownOpen && (
                <div className="absolute mt-[130%] ml-[-100%] w-48 bg-gray-500 rounded-md shadow-lg z-10">
                  <a
                    href="/homecard"
                    className="block rounded-md px-4 py-2 text-white hover:bg-gray-400"
                  >
                    List Location
                  </a>
                  <a
                    href="/map"
                    className="block rounded-md px-4 py-2 text-white hover:bg-gray-400"
                  >
                    Map
                  </a>
                </div>
              )}
            </button>
            {isAdminPage ? (
              <a href="/ListContact" className="flex items-center space-x-2">
                <box-icon
                  name="contact"
                  type="solid"
                  color="#ffffff"
                ></box-icon>
                <span>Response</span>
              </a>
            ) : isuserPage && user && user.role === "User" ? (
              <a href="/GuideRequest" className="flex items-center space-x-2">
                <box-icon name="user-plus" color="#ffffff"></box-icon>
                <span>Daftar Guide</span>
              </a>
            ) : (
              !isuserPage &&
              !isAdminPage && (
                <a href="/Contact" className="flex items-center space-x-2">
                  <box-icon name="message-dots" color="#ffffff"></box-icon>
                  <span>Contact</span>
                </a>
              )
            )}

            {isAdminPage && user && user.role === "Admin" && (
              <a href="/Dashboard" className="flex items-center space-x-2">
                <box-icon
                  name="dashboard"
                  type="solid"
                  color="#ffffff"
                ></box-icon>
                <span>Guide</span>
              </a>
            )}
            {isDetailLocation ? (
              <a href="/homecard" className="flex items-center space-x-2">
                <img
                  src="../img/Card/AI.png"
                  alt="AI"
                  className="h-7 w-7 object-cover"
                />
              </a>
            ) : (
              !IsLocation && (
                <a href="/homecard" className="flex items-center space-x-2">
                  <img
                    src="./img/Card/AI.png"
                    alt="AI"
                    className="h-7 w-7 object-cover"
                  />
                </a>
              )
            )}
            {user ? (
              isDashboardPage &&
              (user.role === "Guide" ||
                user.role === "Admin" ||
                user.role === "User") ? (
                <button
                  onClick={handleLogout}
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <box-icon name="log-out"></box-icon>
                  <span>Logout</span>
                </button>
              ) : user.role === "Guide" || user.role === "User" ? (
                <a
                  href="/dashboard"
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <box-icon name="dashboard" type="solid"></box-icon>
                  <span>Dashboard</span>
                </a>
              ) : user.role === "Admin" ? (
                <a
                  href="/Admin"
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <box-icon name="dashboard" type="solid"></box-icon>
                  <span>Dashboard</span>
                </a>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <box-icon name="log-out"></box-icon>
                  <span>Logout</span>
                </button>
              )
            ) : (
              <a
                href="/login"
                className="bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-lg flex items-center space-x-2"
              >
                <box-icon name="log-in"></box-icon>
                <span>Login</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible on smaller screens) */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-navbar-color text-white p-5 space-y-4 z-50 transition-transform transform translate-x-0 mr-10">
          <div className="flex justify-between items-center mb-4">
            {user ? (
              <span className="text-lg font-bold">
                Hai, <strong className="capitalize">{user.name}</strong>
              </span>
            ) : (
              <h1 className="text-3xl text-color-yellow kodchasan-bold">
                Nongki-Yok
              </h1>
            )}
            <button
              onClick={() => setMobileMenuOpen(false)} // Saat ditekan, mobile menu akan tertutup dan navbar muncul kembali
              className="text-white text-2xl"
            >
              &times;
            </button>
          </div>
          <a
            href="/"
            className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2"
          >
            <box-icon name="home" color="#ffffff"></box-icon>
            <span>Home</span>
          </a>
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none w-full text-left"
          >
            <p className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2">
              <box-icon name="map-pin" color="#ffffff"></box-icon>
              <span>Location</span>
            </p>
            {dropdownOpen && (
              <div className="mt-3 w-full bg-color-primary text-white">
                <a
                  href="/homecard"
                  className="block py-2 px-4 border-b border-gray-700 hover:text-color-gold-card"
                >
                  List Location
                </a>
                <a
                  href="/map"
                  className="block py-2 px-4 border-b border-gray-700 hover:text-color-gold-card"
                >
                  Map
                </a>
              </div>
            )}
          </button>
          {isAdminPage ? (
            <a
              href="/ListContact"
              className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2"
            >
              <box-icon name="contact" type="solid" color="#ffffff"></box-icon>
              <span>Contact List</span>
            </a>
          ) : isuserPage && user && user.role === "User" ? (
            <a
              href="/GuideRequest"
              className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2"
            >
              <box-icon name="user-plus" color="#ffffff"></box-icon>
              <span>Daftar Guide</span>
            </a>
          ) : (
            !isuserPage &&
            !isAdminPage && (
              <a
                href="/Contact"
                className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2"
              >
                <box-icon name="message-dots" color="#ffffff"></box-icon>
                <span>Contact</span>
              </a>
            )
          )}

          {isAdminPage && user && user.role === "Admin" && (
            <a
              href="/Dashboard"
              className="py-2 px-4 border-b border-gray-700 hover:text-color-gold-card flex items-center space-x-2"
            >
              <box-icon
                name="dashboard"
                type="solid"
                color="#ffffff"
              ></box-icon>
              <span>Dashboard Guide</span>
            </a>
          )}
          {isDetailLocation ? (
            <a
              href="/homecard"
              className="items-center flex py-2 px-4 border-b border-gray-700 hover:text-color-gold-card"
            >
              <img
                src="../img/Card/AI.png"
                alt="AI"
                className="h-6 w-6 object-cover"
              />
              <p className=" text-wrap ms-2">Powerd by Gemini</p>
            </a>
          ) : (
            !IsLocation && (
              <a
                href="/homecard"
                className="items-center flex py-2 px-4 border-b border-gray-700 hover:text-color-gold-card"
              >
                <img
                  src="./img/Card/AI.png"
                  alt="AI"
                  className="h-6 w-6 object-cover"
                />
                <p className=" text-wrap ms-2">Powerd by Gemini</p>
              </a>
            )
          )}
          <div className="hover:text-color-gold-card">
            {user ? (
              isDashboardPage &&
              (user.role === "Guide" ||
                user.role === "Admin" ||
                user.role === "User") ? (
                <a
                  onClick={handleLogout}
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-3 px-4 rounded-lg border-b border-gray-700 jura-medium flex items-center space-x-2"
                >
                  <box-icon name="log-out"></box-icon>
                  <span>Logout</span>
                </a>
              ) : user.role === "Guide" || user.role === "User" ? (
                <a
                  href="/dashboard"
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-3 px-4 rounded-lg border-b border-gray-700 jura-medium flex items-center space-x-2"
                >
                  <box-icon name="dashboard" type="solid"></box-icon>
                  <span>Dashboard</span>
                </a>
              ) : user.role === "Admin" ? (
                <a
                  href="/Admin"
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-3 px-4 rounded-lg border-b border-gray-700 jura-medium flex items-center space-x-2"
                >
                  <box-icon name="dashboard" type="solid"></box-icon>
                  <span>Dashboard</span>
                </a>
              ) : (
                <a
                  onClick={handleLogout}
                  className="bg-color-yellow hover:bg-color-gold-card text-black py-3 px-4 rounded-lg border-b border-gray-700 jura-medium flex items-center space-x-2"
                >
                  <box-icon name="log-out"></box-icon>
                  <span>Logout</span>
                </a>
              )
            ) : (
              <a
                href="/login"
                className="bg-color-yellow hover:bg-color-gold-card text-black py-3 px-4 rounded-lg border-b border-gray-700 jura-medium flex items-center space-x-2"
              >
                <box-icon name="log-in"></box-icon>
                <span>Login</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
