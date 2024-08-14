import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState([
    -8.670984102338322, 115.21225631025192,
  ]); // Default position

  useEffect(() => {
    // Attempt to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
          // Use default position if location access is denied
          setPosition([-8.670984102338322, 115.21225631025192]);
        }
      );
    }

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/locations",
          {
            withCredentials: true,
          }
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Function to determine the number of money icons based on price
  const getMoneyIcons = (price) => {
    if (price < 35000) {
      return 1;
    } else if (price >= 35000 && price <= 60000) {
      return 2;
    } else if (price <= 80000) {
      return 3;
    }
    return 0; // Default return value if price doesn't match any condition
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Navbar className="m-0 p-0" />
      </div>
      <MapContainer
        center={position}
        zoom={13}
        className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.Latitude, location.Longtitude]}>
            <Popup>
              <strong>{location.Name}</strong>
              <hr className="m-1 bg-color-primary" />
            <div className="container">
              <img
                src={location.Image ? `./${location.Image}` : './img/Card/image-ex.png'}
                alt="img-card"
                className="rounded-t-lg w-full h-28 object-cover"
              />
              <div className="flex items-center">
                  <div className="flex">
                  {[...Array(getMoneyIcons(location.AVG_Price))].map((_, idx) => (
                    <img
                      key={idx}
                      src="./img/Card/money2.png"
                      alt="icon-money"
                      className="h-6 w-6"
                    />
                ))}
              </div>
              </div>
              <span className="inline-flex mt-1 ms-auto  items-center self-end rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {location.Category}
              </span>
              <span className="inline-flex mt-1 ms-1  items-center self-end rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {location.Size}
              </span>
            </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
