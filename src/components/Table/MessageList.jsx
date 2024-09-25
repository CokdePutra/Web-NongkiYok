import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MessageList = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // State untuk pesan yang dipilih
  const [reply, setReply] = useState(""); // State untuk jawaban
  const [showReplyPopup, setShowReplyPopup] = useState(false); // State untuk mengontrol pop-up
  const [isSending, setIsSending] = useState(false); // State untuk loading

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
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
        const response = await axios.get(`${baseURL}/api/contact`, {
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this after delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/contact/delete/${id}`, {
          withCredentials: true,
        });
        setMessages(messages.filter((message) => message.Id_Contact !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Message has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  };

  const handleReplyClick = (message) => {
    setSelectedMessage(message);
    setShowReplyPopup(true);
  };

  const handleReplySubmit = async () => {
    setIsSending(true); // Aktifkan state loading saat proses dimulai
    try {
      await axios.post(
        `${baseURL}/api/contact/reply/${selectedMessage.Id_Contact}`,
        {
          message: selectedMessage.Massage, // Pesan asli yang ingin dijawab
          reply, // Jawaban dari admin
        },
        { withCredentials: true }
      );
      setReply("");
      setShowReplyPopup(false);
      Swal.fire({
        title: "Success Replay!",
        text: "Reply sent successfully via email!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error sending reply", error);
      Swal.fire({
        title: "Faild send replay!",
        text: "Reply sent faild!, something went wrong!",
        icon: "error",
      });
    } finally {
      setIsSending(false); // Nonaktifkan loading setelah proses selesai
    }
  };

  const handlePopupClose = () => {
    setShowReplyPopup(false);
    setReply("");
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      {new Date(message.tanggal).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {message.Name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {message.Email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-wrap">
                      {message.Massage}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                      <button
                        className="text-white-600 hover:text-indigo-900 mr-2 bg-green-500 text-white py-1 px-4 rounded"
                        onClick={() => handleReplyClick(message)}
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

      {/* Reply Popup */}
      {showReplyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl kodchasan-bold mb-4">Reply to Message</h2>
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>From:</strong> {selectedMessage.Name} (
                {selectedMessage.Email})
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong> {selectedMessage.Massage}
              </p>
            </div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              rows="4"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply here..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-red-500 text-white py-2 px-4 rounded"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
              <button
                className={`bg-green-500 text-white py-2 px-4 rounded ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleReplySubmit}
                disabled={isSending} // Nonaktifkan tombol saat sedang loading
              >
                {isSending ? "Sending..." : "Send Reply"}{" "}
                {/* Ubah teks menjadi loading */}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
