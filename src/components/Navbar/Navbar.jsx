import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="container-Navbar sticky top-0 w-full">
        <div className="content flex m-5 justify-between bg-navbar-color rounded-lg overflow-hidden">
          <div className="Left m-5">
            <h1 className="text-4xl text-color-yellow kodchasan-bold">
              Nongki-Yok
            </h1>
          </div>
          <div className="Right m-5 space-x-8 text-white jura-medium">
            <span className="text-2xl border-l-2 border-white"></span>
            <a href="#" className="">
              Home
            </a>
            <a href="#">Location</a>
            <a href="#">Contact</a>
            <button className="bg-button-gray hover:bg-color-primary text-white py-2 px-4 rounded-lg">
              <a href="#">Sign In</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
