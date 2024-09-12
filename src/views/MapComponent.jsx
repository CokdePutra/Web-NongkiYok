import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

const getMarkerColor = (price) => {
  if (price < 35000) {
    return "green"; // Cheap (below 35000)
  } else if (price >= 35000 && price <= 60000) {
    return "blue"; // Moderate (35000 - 60000)
  } else if (price <= 80000) {
    return "violet"; // Expensive (60000 - 80000)
  }
  return "gray"; // Default color if price doesn't match
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

const MapComponent = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState([
    -8.670984102338322, 115.21225631025192,
  ]); // Default position
  const [userCircle, setUserCircle] = useState(null); // Circle state

  useEffect(() => {
    // Attempt to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          // Create a circle around the user's location
          setUserCircle({
            position: [latitude, longitude],
            radius: 500, // Customize radius if needed
          });
        },
        (err) => {
          console.error("Error getting location:", err);
          // Use default position if location access is denied and no circle
          setPosition([-8.670984102338322, 115.21225631025192]);
          setUserCircle(null); // No circle if geolocation is denied
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

  const UserCircle = () => {
    const map = useMap(); // Access the map instance

    useEffect(() => {
      if (userCircle) {
        const circle = L.circle(userCircle.position, {
          color: "#2e76e8",
          fillColor: "#2e76e8",
          fillOpacity: 0.5,
          radius: userCircle.radius,
        }).addTo(map).bindPopup("You're around here");;

        // Cleanup circle on unmount
        return () => {
          map.removeLayer(circle);
        };
      }
    }, [userCircle, map]);

    return null;
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
        
        {/* Render the user's circle if they allowed location access */}
        {userCircle && <UserCircle />}

        {locations.map((location, index) => (
  <Marker
    key={index}
    position={[location.Latitude, location.Longtitude]}
    icon={createCustomIcon(getMarkerColor(location.AVG_Price))}>
    <Popup>
      <strong className="kodchasan-bold">{location.Name}</strong>
      <hr className="m-1 bg-color-primary" />
      <div className="container jura-medium">
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
        <span className="inline-flex mt-1 ms-auto items-center self-end rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-yellow-600/20">
          {location.Category}
        </span>
        <span className="inline-flex mt-1 ms-1 items-center self-end rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-yellow-600/20">
          {location.Size}
        </span>
      </div>
    </Popup>
  </Marker>
))
}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
