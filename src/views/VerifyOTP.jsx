import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk kontrol show/hide password
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const email = location.state?.email; // Ambil email dari state yang dikirim dari halaman ForgotPassword

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      Swal.fire({
        title: "Oops!",
        text: "OTP and New Password cannot be empty.",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/verify-reset-otp`, {
        email,
        otp,
        newPassword,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your password has been successfully reset.",
          icon: "success",
        });
        navigate("/login"); // Arahkan ke halaman login setelah password direset
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text:
          error.response?.data?.message || "Invalid OTP or an error occurred.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Mengubah state showPassword
  };

  return (
    <div className="container-verify-otp h-screen flex justify-center items-center px-5">
      <div className="content w-full md:w-3/4 lg:w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-4xl m-3">Verify OTP</h1>
        <form onSubmit={handleVerifyOTP} className="w-full">
          <input
            type="text"
            placeholder="Enter OTP..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border mt-2 bg-hover-button text-black rounded-full h-9 p-5 m-2 w-full"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Ubah tipe input berdasarkan state showPassword
              placeholder="Enter new password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border mt-2 bg-hover-button text-black rounded-full h-9 p-5 m-2 w-full"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[4px]"
            >
              <box-icon
                name={showPassword ? "hide" : "show"}
                type="solid"
              ></box-icon>
            </span>
          </div>
          <button
            type="submit"
            className="w-full my-4 p-2 bg-color-yellow hover:bg-color-gold-card text-black py-2 px-4 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
      <img
        src="./img/Login/Polygon1.png"
        alt=""
        className="absolute w-1/4 md:w-1/5 bottom-0 left-0 -z-10"
      />
      <img
        src="./img/Login/Polygon2.png"
        alt=""
        className="absolute w-1/4 md:w-1/5 top-0 right-0 -z-10"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/6 md:w-1/10 top-[5rem] left-[2rem] md:left-[4rem] -z-10"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/6 md:w-1/10 bottom-[2rem] right-[2rem] md:right-[4rem] -z-10"
      />
    </div>
  );
};

export default VerifyOTP;
