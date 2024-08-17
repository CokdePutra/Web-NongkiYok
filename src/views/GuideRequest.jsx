import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const GuideRequest = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [alasan, setAlasan] = useState("");
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);

        if (role !== "User") {
          navigate("/");
        } else {
          await checkPendingRequest();
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        navigate("/");
      }
    };

    const checkPendingRequest = async () => {
      try {
        const pendingResponse = await axios.get(
          "http://localhost:5000/api/registerguide/check",
          {
            withCredentials: true,
          }
        );
        setHasPendingRequest(pendingResponse.data.hasPendingRequest);
      } catch (error) {
        console.error("Error checking pending request:", error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/registerguide",
        { Alasan: alasan },
        {
          withCredentials: true,
        }
      );
      alert(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting guide request:", error);
      alert("Failed to submit guide request");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-6">
      {hasPendingRequest ? (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Request Berhasil</p>
              <p className="text-sm">Tunggu hingga admin menerima anda.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-500 p-12 rounded-2xl shadow-2xl w-full max-w-xl">
          <h2 className="text-black text-4xl font-extrabold mb-4 kodchasan-bold text-start">
            Become a Guide
          </h2>
          <hr className="border-t-4 border-black mb-6" />
          <div className="mb-8">
            <ul className="list-decimal jura-medium ml-6 font-bold text-black text-xl space-y-2">
              <li>Kontribusi ke pariwisata lokal</li>
              <li>Kontribusi ke perekonomian lokal</li>
              <li>Membantu para UMKM dan usaha lokal agar dikenal</li>
              <li>Membantu masyarakat untuk wawasan tempat yang beragam</li>
              <li>Dari komunitas untuk komunitas</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <textarea
                placeholder="Alasan . . ."
                className="jura-medium w-full p-4 rounded-xl text-lg border border-gray-400 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500 resize-none transition duration-200 ease-in-out"
                rows="6"
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="jura-medium w-full bg-black text-yellow-500 py-3 rounded-xl text-lg hover:bg-yellow-600 hover:text-black transition-colors duration-200 ease-in-out"
            >
              Apply
            </button>
          </form>
        </div>
      )}
          <Link to="/dashboard">
            <div className="flex gap-1 mt-2 ml-3 mb-1 absolute bottom-[2rem] z-10 left-[2rem]">
              <img
                src="./img/Card/Icon2.png"
                alt="Back Icon"
                className="w-6 h-[auto]"
              />
              <h3 className="text-Black jura-medium">Back</h3>
            </div>
          </Link>
      <img
        src="./img/Login/Polygon1.png"
        alt=""
        className="absolute w-1/5 bottom-0 left-0 -z-3"
      />
      <img
        src="./img/Login/Polygon2.png"
        alt=""
        className="absolute w-1/5 top-0 right-0 -z-1"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/10 bottom-[2rem] right-[4rem] -z-1"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/10 top-[5rem] left-[4rem] -z-1"
      />
    </div>
  );
};

export default GuideRequest;
