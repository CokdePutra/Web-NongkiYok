import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Helper function to determine marker color based on price
const getMarkerColor = (price) => {
  if (price < 35000) return "green";
  else if (price >= 35000 && price <= 60000) return "blue";
  else if (price >= 60001) return "violet";
  return "gray";
};

// Function to create a custom marker icon with the desired color
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
};

// Custom icon for user's location
const userIcon = new L.Icon({
  iconUrl: "./img/man.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const MapComponent = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState([
    -8.670984102338322, 115.21225631025192,
  ]);
  const [userPosition, setUserPosition] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});

  const fetchServerTime = async () => {
    try {
      const response = await axios.get(`${baseURL}/server-time`);
      setServerTime(new Date(response.data.currentTime));
    } catch (error) {
      console.error("Error fetching server time", error);
    }
  };

  const fetchAverageRatings = async () => {
    const ratings = {};
    for (const location of locations) {
      const avg = await AverageRating(location.Id_Places);
      ratings[location.Id_Places] = avg || 0;
    }
    setAverageRatings(ratings);
  };

  useEffect(() => {
    if (locations.length) {
      fetchAverageRatings();
    }
  }, [locations]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setUserPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
          setPosition([-8.670984102338322, 115.21225631025192]);
          setUserPosition(null);
        }
      );
    }

    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/locations`, {
          withCredentials: true,
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchServerTime();
    fetchLocations();
  }, []);

  const getMoneyIcons = (price) => {
    if (price < 35000) return 1;
    else if (price >= 35000 && price <= 60000) return 2;
    else if (price >= 60001) return 3;
    return 0;
  };

  const checkIsOpen = (openTime, closeTime) => {
    if (!serverTime) return false;

    const currentTime = new Date(serverTime);
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    const open = new Date(`1970-01-01T${openTime}`);
    const close = new Date(`1970-01-01T${closeTime}`);
    const currentParsed = new Date(
      `1970-01-01T${currentHours.toString().padStart(2, "0")}:${currentMinutes
        .toString()
        .padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`
    );

    if (close < open) {
      return currentParsed >= open || currentParsed < close;
    } else {
      return currentParsed >= open && currentParsed < close;
    }
  };

  const AverageRating = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/api/review/${id}`, {
        withCredentials: true,
      });
      const reviews = response.data;
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.Rating,
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return 0;
    }
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? "★" : "";
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Navbar className="m-0 p-0" />
      </div>
      <MapContainer
        center={position}
        zoom={13}
        zoomControl={false}
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>You are around here</Popup>
          </Marker>
        )}

        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.Latitude, location.Longtitude]}
            icon={createCustomIcon(getMarkerColor(location.AVG_Price))}
          >
            <Popup>
              <a
                href={location.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-black font-bold"
              >
                <strong className="kodchasan-bold">{location.Name}</strong>
              </a>
              <hr className="m-1 bg-color-primary" />
              <div className="container jura-medium">
                <img
                  src={
                    location.Image
                      ? `./${location.Image}`
                      : "./img/Card/image-ex.png"
                  }
                  alt="img-card"
                  className="rounded-t-lg w-full h-28 object-cover"
                />
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(getMoneyIcons(location.AVG_Price))].map(
                      (_, idx) => (
                        <img
                          key={idx}
                          src="./img/Card/money2.png"
                          alt="icon-money"
                          className="h-6 w-6"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="info flex gap-2 mt-2">
                  <span className="inline-flex items-center justify-center rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    {location.Category}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    {location.Size}
                  </span>
                  {checkIsOpen(location.Open, location.Close) ? (
                    <span className="inline-flex items-center justify-center rounded-md bg-green-700 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-600/20">
                      <box-icon
                        name="time-five"
                        color="#FCBC36"
                        type="solid"
                        className="mr-1"
                        size="20px"
                      ></box-icon>
                      &nbsp;Open
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-md bg-red-700 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-600/20">
                      <box-icon
                        name="time-five"
                        color="#FCBC36"
                        type="solid"
                        className="mr-1"
                        size="20px"
                      ></box-icon>
                      &nbsp;Closed
                    </span>
                  )}
                </div>
                <hr className="border-t-2 border-gray-300 mb-2 mt-3" />
                <div className="flex justify-between items-center h-auto">
                  <div className="flex items-center">
                    {renderRatingStars(averageRatings[location.Id_Places])}
                    <span className="ml-1 text-sm">
                      ({averageRatings[location.Id_Places]})
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={`/DetailLocation/${location.Id_Places}`}
                      className="!text-blue-800 hover:text-gray-500 font-semibold transition duration-300 ease-in-out transform hover:scale-105 rounded-lg flex items-center w-auto"
                    >
                      <box-icon
                        type="solid"
                        name="info-circle"
                        color="currentColor"
                        size="20px"
                      ></box-icon>
                      <span className="ml-1">Detail</span>
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
