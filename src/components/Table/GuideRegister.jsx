import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GuideRegister = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/GuideRequest`, {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this user as a Guide?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${baseURL}/api/users/update/${userId}`,
          {},
          {
            withCredentials: true,
          }
        );
        setUsers(
          users.map((user) =>
            user.Id_User === userId
              ? { ...user, Status: "Approved", Role: "Guide" }
              : user
          )
        );
        Swal.fire({
          title: "Approved!",
          text: "User approved successfully!",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error approving user", error);
      }
    }
  };

  const handleReject = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/users/deleterequest/${userId}`, {
          withCredentials: true,
        });
        setUsers(users.filter((user) => user.Id_User !== userId));
        Swal.fire({
          title: "Rejected!",
          text: "User request has been rejected.",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error rejecting user", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">Request Guide</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="relative max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-fixed bg-white">
            <thead className="sticky top-0 text-bo bg-white shadow">
              <tr>
                <th className="w-40 px-4 py-2">Name</th>
                <th className="w-40 px-4 py-2">Email</th>
                <th className="w-64 px-4 py-2">Username</th>
                <th className="w-40 px-4 py-2">Alasan</th>
                <th className="w-40 px-4 py-2">Status</th>
                <th className="w-64 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {users.map((user) => (
                <tr key={user.Id_User}>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-wrap">
                    {user.Username}
                  </td>
                  <td className="px-4 py-2 whitespace-wrap">{user.Alasan}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.Status}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-green-500 text-white py-1 px-4 rounded"
                      onClick={() => handleApprove(user.Id_User)}
                    >
                      Approved
                    </button>
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-red-500 text-white py-1 px-4 rounded"
                      onClick={() => handleReject(user.Id_User)}
                    >
                      Reject
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

export default GuideRegister;
