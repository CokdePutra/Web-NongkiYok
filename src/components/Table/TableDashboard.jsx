import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">Lokasi Ngopi</h1>
        <a href="/locationinput">
          <button className="bg-color-yellow hover:bg-button-gray text-color-black hover:text-white font-bold py-2 px-4 text-m rounded">
            + Tambahkan Tempat
          </button>
        </a>
      </div>
      <table className="min-w-full rounded table-fixed bg-white">
        <thead>
          <tr>
            <th className="w-40 px-4 py-2 text-xs">Nama</th>
            <th className="w-40 px-4 py-2 text-xs">Kategori</th>
            <th className="w-64 px-4 py-2 text-xs">Deskripsi</th>
            <th className="w-36 px-4 py-2 text-xs">Harga</th>
            <th className="w-28 px-4 py-2 text-xs">Latitude</th>
            <th className="w-28 px-4 py-2 text-xs">Longitude</th>
            <th className="w-28 px-4 py-2 text-xs">Lokasi</th>
            <th className="w-24 px-4 py-2 text-xs">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {places.map((place) => (
            <tr key={place.id}>
              <td className="px-4 py-2 whitespace-nowrap">{place.Name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{place.Category}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {place.Description}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{place.AVG_Price}</td>
              <td className="px-4 py-2 whitespace-nowrap">{place.Latitude}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {place.Longtitude}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <a href={place.Link} target="_blanks">
                  <div className="icon-location flex items-center">
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
  );
};

export default TableDashboard;
