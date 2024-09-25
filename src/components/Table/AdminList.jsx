import React, { useEffect, useState } from "react";
import axios from "axios";
import "boxicons";

const AdminList = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [Admin, setAdmin] = useState([]);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/Admin`, {
          withCredentials: true,
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching Admin", error);
      }
    };
    fetchAdmin();
  }, []);
  return (
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">Admin</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="relative max-h-[500px] overflow-y-auto rounded-lg">
          <table className="min-w-full table-fixed bg-white">
            <thead className="sticky top-0 text-bo bg-white shadow">
              <tr>
                <th className="w-40 px-4 py-2">Nama</th>
                <th className="w-40 px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {Admin.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{admin.Name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{admin.Role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
