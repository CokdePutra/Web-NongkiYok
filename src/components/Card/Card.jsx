import React, { useState, useEffect } from "react";
import axios from "axios";
import "boxicons";
import Swal from "sweetalert2";

const Card = ({
  placeId,
  title,
  imgSrc,
  description,
  link,
  price,
  category,
  size,
}) => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch favorite status when component mounts
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        // Check if the user is logged in
        const sessionResponse = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });
        console.log(sessionResponse);
        setIsLoggedIn(true); // User is logged in

        // If the user is logged in, fetch the favorite status
        const response = await axios.get(
          `${baseURL}/api/favorite/status/${placeId}`,
          {
            withCredentials: true,
          }
        );
        setIsFavorited(response.data.isFavorited);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsLoggedIn(false); // User is not logged in
        } else {
          console.error("Error fetching favorite status", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [placeId]);

  // Function to toggle favorite status
  const handleFavoriteClick = async () => {
    try {
      if (!isFavorited) {
        await axios.post(
          `${baseURL}/api/add/favorites`,
          { placeId },
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.delete(`${baseURL}/api/delete/favorites/${placeId}`, {
          withCredentials: true,
        });
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to add to favorites.",
        icon: "error",
      });
    }
  };

  const getMoneyIcons = (price) => {
    if (price < 35000) {
      return 1;
    } else if (price >= 35000 && price <= 60000) {
      return 2;
    } else if (price <= 80000) {
      return 3;
    }
  };

  const moneyIcons = Array.from({ length: getMoneyIcons(price) });

  return (
    <div className="card bg-navbar-color rounded-lg shadow-lg p-6 m-4 w-[20rem] flex flex-col place-content-between overflow-hidden ">
      {isLoggedIn && (
        <div className="z-1 my-[-12px] mb-1 absolute">
          <box-icon
            name="bookmark"
            type={isFavorited ? "solid" : "regular"}
            color="#FCBC36"
            size="md"
            onClick={handleFavoriteClick}
            style={{ cursor: "pointer" }}
          ></box-icon>
        </div>
      )}
      <img
        src={imgSrc}
        alt="img-card"
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="info gap-1 mt-2">
        <span className="inline-flex mt-1 mx-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {category}
        </span>
        <span className="inline-flex mt-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {size}
        </span>
      </div>
      <h1 className="title kodchasan-bold text-2xl mt-1 text-white">{title}</h1>
      <p className="description text-gray-300 mt-2">{description}</p>
      <div className="flex justify-between mt-4 h-auto">
        <div className="icon-money flex items-center">
          {moneyIcons.map((_, index) => (
            <img
              key={index}
              src="./img/Card/money.png"
              alt="icon-money"
              className="h-6 w-6"
            />
          ))}
        </div>
        <a href={link} target="_blanks">
          <div className="icon-location flex items-center">
            <img
              src="./img/Card/location.png"
              alt="icon-location"
              className="h-6 w-6"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Card;
