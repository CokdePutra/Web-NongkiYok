import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "../components/UserInput/UserInput";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditLocation = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL

  const [formData, setFormData] = useState({
    Name: "",
    AVG_Price: "",
    Size:"",
    Category: "",
    Latitude: "",
    Longtitude: "",
    Link: "",
    Description: "",
    Img_old: "", // Field to store the old image
  });
  const [userRole, setUserRole] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
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
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get/places/${id}`, {
          withCredentials: true,
        });
        setFormData({ ...response.data, Img_old: response.data.Image }); // Store the old image in Img_old
      } catch (error) {
        console.error("Error fetching place data:", error);
        setError("Failed to load place data");
      }
    };

    fetchPlaceData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (image) {
      formDataToSend.append("image", image); // Append the new image if it exists
    } else {
      formDataToSend.append("image", formData.Img_old); // Append the old image if no new image is uploaded
    }

    try {
      await axios.put(`http://localhost:5000/api/places/update/${id}`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating place", error);
      setError(error.response ? error.response.data : "Error updating place");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-color-yellow kodchasan-bold mt-[4vh]">
        FORM EDIT TEMPAT
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-navbar-color"
      >
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">
            Nama Tempat
          </label>
          <UserInput
            type="text"
            id="name"
            placeholder="Toko..."
            name="Name"
            className="w-full py-2 border rounded-md ml-[-2px]"
            value={formData.Name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">
              Rata-Rata Harga
            </label>
            <UserInput
              type="number"
              id="price"
              placeholder="20000..."
              inputMode="numeric"
              name="AVG_Price"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              value={formData.AVG_Price}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">
              Kategori
            </label>
            <select
              required
              className="bg-hover-button text-black rounded-md h-9 p-5 m-2 w-full px-2 py-1 border ml-[-5px]"
              name="Category"
              id="Category"
              value={formData.Category}
              onChange={handleChange}
            >
              <option value="">
                Pilih Kategori
              </option>
              <option value="Cafe">Cafe</option>
              <option value="Resto">Resto</option>
            </select>
          </div>
          <div className="w-1/3">
            <label className="block text-color-yellow jura-medium">
              Size lokasi
            </label>
            <select
              required
              className="bg-hover-button text-black rounded-md h-9 p-5 m-2 w-full px-2 py-1 border ml-[-5px]"
              name="Size"
              id="Size"
              value={formData.Size}
              onChange={handleChange}
            >
              <option value="">
                Pilih Size
              </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">
              Latitude
            </label>
            <UserInput
              type="text"
              id="latitude"
              placeholder="-8.6513135..."
              inputMode="numeric"
              name="Latitude"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              value={formData.Latitude}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">
              Longitude
            </label>
            <UserInput
              type="text"
              id="longitude"
              placeholder="115.1939839..."
              inputMode="numeric"
              name="Longtitude"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              value={formData.Longtitude}
              onChange={handleChange}
            />
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
              name="Link"
              className="w-full px-3 py-2 border rounded-md ml-[-2px]"
              value={formData.Link}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">
              Upload Image
            </label>
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
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">
            Deskripsi Tempat
          </label>
          <UserInput
            type="text"
            id="description"
            placeholder="Deskripsi singkat..."
            name="Description"
            className="w-full px-3 py-2 border rounded-md ml-[-2px]"
            value={formData.Description}
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
      </form>
      <Link to="/dashboard">
        <div className="flex gap-1 mt-2 ml-3 mb-1 absolute bottom-[2rem] left-[2rem]">
          <img
            src="../img/Card/Icon.png"
            alt="Back Icon"
            className="w-6 h-[auto]"
          />
          <h3 className="text-white jura-medium">Back</h3>
        </div>
      </Link>
    </>
  );
};

export default EditLocation;
