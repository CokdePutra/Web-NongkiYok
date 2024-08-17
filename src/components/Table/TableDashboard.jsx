import React, { useEffect, useState } from "react";
import axios from "axios";
import 'boxicons';

const TableDashboard = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/places", {
          withCredentials: true,
        });
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places", error);
      }
    };
    fetchPlaces();
  }, []);

  const handleDelete = async (placeId) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/places/delete/${placeId}`,
          {
            withCredentials: true,
          }
        );
        // Remove the deleted place from the state
        setPlaces(places.filter((place) => place.id !== placeId));

        // Redirect to the dashboard page after successful deletion
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Error deleting place", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">Lokasi Ngopi</h1>
        <a href="/locationinput">
          <button className="bg-color-yellow hover:bg-button-gray text-color-black hover:text-white font-bold py-2 px-4 text-m rounded">
            + Tambahkan Tempat
          </button>
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="relative max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-fixed bg-white">
            <thead className="sticky top-0 text-bo bg-white shadow">
              <tr>
                <th className="w-40 px-4 py-2">Nama</th>
                <th className="w-40 px-4 py-2">Kategori</th>
                <th className="w-40 px-4 py-2">Size</th>
                <th className="w-64 px-4 py-2">Deskripsi</th>
                <th className="w-36 px-4 py-2">Harga</th>
                <th className="w-28 px-4 py-2">Latitude</th>
                <th className="w-28 px-4 py-2">Longitude</th>
                <th className="w-28 px-4 py-2">Gambar</th>
                <th className="w-28 px-4 py-2">Lokasi</th>
                <th className="w-24 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {places.map((place) => (
                <tr key={place.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{place.Name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{place.Category}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{place.Size}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-wrap">
                    {place.Description}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{place.AVG_Price}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{place.Latitude}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {place.Longtitude}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {place.Image ? (
                      <a href={place.Image ? `./${place.Image}` : './img/Card/image-ex.png'} target="_blanks">
                        <div className="icon-location flex justify-center">
                          <box-icon type='solid' name='image'>icon</box-icon>
                        </div>
                      </a>
                    ) : (
                      <p className="icon-location flex justify-center">-</p>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <a href={place.Link} target="_blanks">
                      <div className="icon-location flex justify-center">
                        <img
                          src="./img/Card/location.png"
                          alt="icon-location"
                          className="h-6 w-6"
                        />
                      </div>
                    </a>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-blue-500 text-white py-1 px-4 rounded"
                      onClick={() => window.location.href = `/EditLocation/${place.Id_Places}`}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-red-500 text-white py-1 px-4 rounded"
                      onClick={() => handleDelete(place.Id_Places)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
