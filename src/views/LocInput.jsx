import React, { useState } from "react";

const LockInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    longitude: "",
    latitude: "",
    googleMapsLink: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-color-yellow kodchasan-bold mt-[4vh]">FORM TAMBAHKAN TEMPAT</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-navbar-color">
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">Nama Tempat</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Toko..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">Rata-Rata Harga</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Rp 20000..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Longtitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="115.1939839..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-color-yellow jura-medium">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="-8.6513135..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-color-yellow jura-medium">Link Google Maps</label>
          <input
            type="text"
            name="googleMapsLink"
            value={formData.googleMapsLink}
            onChange={handleChange}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full px-3 py-[10.7px] border rounded-md "
          />
        </div>
        <div className="w-1/2">
          <label className="block text-color-yellow jura-medium">Upload Image</label>
          <input
            type="file"
            name="googleMapsLink"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-white"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-color-yellow jura-medium">Deskripsi Tempat</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tentang Tempat..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
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
