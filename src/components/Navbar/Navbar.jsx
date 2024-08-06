import React, { useState } from "react";

const Navbar = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    List
                  </a>
                  <a
                    href="/map"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Map
                  </a>
                </div>
              )}
            <a href="#">Contact</a>
            <button className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
