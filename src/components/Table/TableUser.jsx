import React, { useEffect, useState } from "react";
import axios from "axios";

const TableUser = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users`, {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${baseURL}/api/users/delete/${userId}`, {
          withCredentials: true,
        });
        setUsers(users.filter((user) => user.User_Id !== userId));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">User Management</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="relative max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-fixed bg-white">
            <thead className="sticky top-0 text-bo bg-white shadow">
              <tr>
                <th className="w-40 px-4 py-2">Name</th>
                <th className="w-40 px-4 py-2">Email</th>
                <th className="w-40 px-4 py-2">Role</th>
                <th className="w-64 px-4 py-2">Username</th>
                <th className="w-64 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {users.map((user) => (
                <tr key={user.Id_User}>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Role}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-wrap">
                    {user.Username}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-red-500 text-white py-1 px-4 rounded"
                      onClick={() => handleDelete(user.Id_User)}>
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

export default TableUser;
