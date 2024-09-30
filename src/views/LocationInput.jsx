import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "../components/UserInput/UserInput";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const LocationInput = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    Size: "",
    Category: "",
    longitude: "",
    latitude: "",
    googleMapsLink: "",
    description: "",
    latlong: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);

        // Redirect if not Guide or Admin
        if (role !== "Guide" && role !== "Admin") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    axios
      .get("/api/session")
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, []);

  const handlecombine = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      latlong: value,
    });
    handleCoordinatesChange(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCoordinatesChange = (e) => {
    const { value } = e.target;
    const [latitude, longitude] = value.split(",");

    setFormData({
      ...formData,
      latlong: value,
      latitude: latitude ? latitude.trim() : "",
      longitude: longitude ? longitude.trim() : "",
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Faild!",
        text: "You must be logged in to add a place.",
        icon: "error",
      });
      setError("You must be logged in to add a place");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (image) {
      formDataToSend.append("image", image);
    }

    axios
      .post(`${baseURL}/api/places`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success Add!",
          text: "Place has been added.",
          icon: "success",
        });
        setError(null);
        navigate("/dashboard");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error adding place!",
          text: "Error adding place. Please try again.",
          icon: "error",
        });
        console.error("Error adding place", error);
        setError(error.response ? error.response.data : "Error adding place");
      });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are at the location?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setFormData((prevData) => ({
                ...prevData,
                latlong: `${latitude}, ${longitude}`,
                latitude: latitude.toString(),
                longitude: longitude.toString(),
              }));
              Swal.fire({
                title: "Added!",
                text: "Places location has been added same as your location",
                icon: "success",
              });
            },
            (error) => {
              Swal.fire({
                title: "Error!",
                text: "Unable to retrieve your location. Please enable location permission on your browser, or enter manually.",
                icon: "error",
              });
              console.error(error);
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Geolocation is not supported by your browser, change your browser or enter manually.",
        icon: "error",
      });
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-color-yellow kodchasan-bold mt-[4vh]">
        Add New Place
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-navbar-color"
      >
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">
            Places Name
          </label>
          <UserInput
            type="text"
            id="name"
            placeholder="Toko..."
            name="name"
            className="w-full py-2 border rounded-md ml-[-2px]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">
              {" "}
              AVG Harga
            </label>
            <UserInput
              type="number"
              id="price"
              placeholder="20000..."
              inputMode="numeric"
              name="price"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">
              Category
            </label>
            <select
              required
              className="bg-hover-button text-black rounded-md h-9 p-5 m-2 w-full px-2 py-1 border ml-[-5px]"
              name="Category"
              id="Category"
              value={formData.Category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Cafe">Cafe</option>
              <option value="Resto">Resto</option>
            </select>
          </div>
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">Size</label>
            <select
              required
              className="bg-hover-button text-black rounded-md h-9 p-5 m-2 w-full px-2 py-1 border ml-[-5px]"
              name="Size"
              id="Size"
              value={formData.Size}
              onChange={handleChange}
            >
              <option value="">Places Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
        {/* Input untuk Latitude dan Longitude dengan ikon Current Location di sebelahnya */}
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex-grow">
            <label className="block text-color-yellow jura-medium">
              Coordinate
            </label>
            <UserInput
              type="text"
              id="coordinates"
              placeholder="-8.61181712575918, 115.19184522667429"
              inputMode="numeric"
              className="w-full px-3 py-2 border rounded-md"
              name="latlong"
              value={formData.latlong}
              onChange={handlecombine}
            />
          </div>

          {/* Icon Current Location di sebelah kanan input */}
          <div className="flex items-center mt-5">
            <box-icon
              name="current-location"
              color="#fcbc36"
              onClick={getCurrentLocation}
              style={{ cursor: "pointer" }}
            ></box-icon>
          </div>
        </div>

        {/* Latitude & Longitude */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="w-full">
            <label className="block text-color-yellow jura-medium">
              Latitude
            </label>
            <UserInput
              type="text"
              id="latitude"
              placeholder="-8.6513135..."
              inputMode="numeric"
              name="latitude"
              className="w-full px-3 py-2 border rounded-md"
              onChange={handleChange}
              value={formData.latitude}
              Isdisabled={true}
            />
          </div>
          <div className="w-full flex items-center space-x-3">
            <div className="flex-grow">
              <label className="block text-color-yellow jura-medium">
                Longitude
              </label>
              <UserInput
                type="text"
                id="longitude"
                placeholder="115.1939839..."
                inputMode="numeric"
                name="longitude"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.longitude}
                onChange={handleChange}
                Isdisabled={true}
              />
            </div>
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">
              Link Google Maps
            </label>
            <UserInput
              type="url"
              id="googleMapsLink"
              placeholder="https://maps.app.goo.gl/..."
              name="googleMapsLink"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">
              Upload Image
            </label>
            <div className="formInput w-full">
              <input
                autoComplete="off"
                type="file"
                id="image"
                name="image"
                className="bg-hover-button text-black rounded-md h-9 p-5 m-2 w-full px-3 py-[2px] border ml-[-2px]"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Deskripsi singkat..."
            name="description"
            className="w-full px-3 py-2 border rounded-md ml-[-2px] bg-hover-button"
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-black text-white px-3 py-2 rounded-md jura-medium"
        >
          Submit
        </button>
        <Link to="/dashboard">
          <div className="flex gap-1 mt-6 ml-3 mb-1 bottom-[2rem] left-[2rem]">
            <img
              src="./img/Card/Icon.png"
              alt="Back Icon"
              className="w-6 h-[auto]"
            />
            <h3 className="text-white jura-medium">Back</h3>
          </div>
        </Link>
      </form>
    </>
  );
};

export default LocationInput;
