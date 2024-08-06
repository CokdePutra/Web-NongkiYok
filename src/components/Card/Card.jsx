import React from "react";

const Card = ({ title, imgSrc, description }) => {
  return (
    <div className="card bg-navbar-color rounded-lg shadow-lg p-6 m-4 w-[20rem] flex flex-col overflow-hidden">
      <img
        src={imgSrc}
        alt="img-card"
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <h1 className="title kodchasan-bold text-2xl mt-4 text-white">{title}</h1>
      <p className="description text-gray-300 mt-2">{description}</p>
      <div className="flex justify-between mt-4">
        <div className="icon-money flex items-center">
          <img
            src="./img/Card/money.png"
            alt="icon-money"
            className="h-6 w-6"
          />
        </div>
        <div className="icon-location flex items-center">
          <img
            src="./img/Card/location.png"
            alt="icon-location"
            className="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
