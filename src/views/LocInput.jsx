import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "../components/UserInput/UserInput";
import { useNavigate } from "react-router-dom";

const LockInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    Category: "",
    longitude: "",
    latitude: "",
    googleMapsLink: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get("/api/session")
      .then(response => {
        setIsLoggedIn(true);
      })
      .catch(error => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("You must be logged in to add a place");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    if (image) {
      formDataToSend.append('image', image);
    }

    axios.post("http://localhost:5000/api/places", formDataToSend, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      console.log(response.data);
      setError(null);
      navigate("/dashboard");
      // Handle success, maybe clear form or show success message
    })
    .catch(error => {
      console.error("Error adding place", error);
      setError(error.response ? error.response.data : "Error adding place");
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-color-yellow kodchasan-bold mt-[4vh]">FORM TAMBAHKAN TEMPAT</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-navbar-color">
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">Nama Tempat</label>
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
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Rata-Rata Harga</label>
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
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Kategori</label>
            <select
              required
              className="bg-hover-button text-black rounded-full h-9 p-5 m-2 w-full px-2 py-1 border ml-[-5px]"
              name="Category"
              id="Category"
              value={formData.Category}  // Tambahkan value untuk menyinkronkan dengan state
              onChange={handleChange}
            >
              <option value="Cafe">Cafe</option>
              <option value="Resto">Resto</option>
            </select>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Latitude</label>
            <UserInput
              type="text"
              id="latitude"
              placeholder="-8.6513135..."
              inputMode="numeric"
              name="latitude"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Longitude</label>
            <UserInput
              type="text"
              id="longitude"
              placeholder="115.1939839..."
              inputMode="numeric"
              name="longitude"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Link Google Maps</label>
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
            <label className="block text-color-yellow jura-medium">Upload Image</label>
            <UserInput
              type="file"
              id="image"
              name="image"
              className="w-full px-3 py-[2px] border rounded-md ml-[-2px]"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">Deskripsi Tempat</label>
          <UserInput
            type="text"
            id="description"
            placeholder="deskripsi singkat..."
            name="description"
            className="w-full px-3 py-2 border rounded-md ml-[-2px]"
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button type="submit" className="w-full bg-black text-white px-3 py-2 rounded-md jura-medium">
          Submit
        </button>
      </form>
      <a href="/dashboard">
        <div className="flex gap-1 mt-2 ml-3 mb-1">
          <img
            src="./img/Card/Icon.png"
            alt="Back Icon"
            className="w-6 h-[auto]"
          />
          <h3 className="text-white jura-medium">Back</h3>
        </div>
      </a>
    </>
  );
};

export default LockInput;
