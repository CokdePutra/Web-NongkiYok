import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessageList = () => {
  const [userRole, setUserRole] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);
        if (role !== "Admin") {
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
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact", {
          withCredentials: true,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/delete/${id}`, {
          withCredentials: true,
        });
        setMessages(messages.filter((message) => message.Id_Contact !== id));
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl kodchasan-bold text-white">Message List</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="relative max-h-[500px] overflow-y-auto">
            <table className="min-w-full table-fixed bg-white">
              <thead className="sticky top-0 text-bo bg-white shadow">
                <tr>
                  <th className="w-40 px-4 py-2">Tanggal</th>
                  <th className="w-40 px-4 py-2">Name</th>
                  <th className="w-40 px-4 py-2">Email</th>
                  <th className="w-64 px-4 py-2">Message</th>
                  <th className="w-20 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y text-center divide-gray-200">
                {messages.map((message) => (
                  <tr key={message.Id_Contact}>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(message.tanggal).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{message.Name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{message.Email}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-wrap">
                      {message.Massage}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                      <button
                        className="text-white-600 hover:text-indigo-900 mr-2 bg-green-500 text-white py-1 px-4 rounded"
                      >
                        Reply
                      </button>
                      <button
                        className="text-white-600 hover:text-indigo-900 mr-2 bg-red-500 text-white py-1 px-4 rounded"
                        onClick={() => handleDelete(message.Id_Contact)}
                      >
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
    </>
  );
};

export default MessageList;
