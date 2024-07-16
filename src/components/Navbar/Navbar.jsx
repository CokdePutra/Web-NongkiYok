import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="container-Navbar">
        <div className="content flex">
          <div className="Left">
            <h1 className="text-6xl text-red-500">Ini Logo atau Judul</h1>
          </div>
          <div className="Left">
            <a href="#">home</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
