import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import Swal from "sweetalert2";
const VerifyEmail = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });
  const [isLoading, setIsLoading] = useState(false);

  const email = location.state?.email;

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      Swal.fire({
        title: "Oops!",
        text: "The verification code cannot be empty",
        icon: "error",
      });
      setMessage({
        text: "The verification code cannot be empty",
        isError: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/verify-email`, {
        email: email,
        verificationToken: verificationCode,
      });
      Swal.fire({
        title: "Verified Successfully!",
        text: "Email successfully verified!",
        icon: "success",
      });
      setMessage({ text: "Email successfully verified!", isError: false });
      navigate("/login"); // Arahkan ke halaman login setelah verifikasi berhasil
    } catch (error) {
      Swal.fire({
        title: "Verification Failed.",
        text: "Verification failed. The code is incorrect or expired.",
        icon: "error",
      });
      setMessage({
        text: "Verification failed. The code is incorrect or expired.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-VerifyEmail h-screen flex justify-center items-center px-5">
      <div className="content kodchasan-bold w-full md:w-3/4 lg:w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-4xl md:text-5xl lg:text-4xl m-3">
          Verify Email
        </h1>
        <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
        <form onSubmit={handleVerifyEmail} className="w-full">
          <UserInput
            type="text"
            name="verificationCode"
            placeholder="Enter verification code..."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full"
          />

          <div className="flex justify-center">
            <ButtonLogin
              text={isLoading ? "Processing..." : "Verify"}
              className="w-full md:w-1/2 my-4 hover:bg-color-gold-card"
              disabled={isLoading}
            />
          </div>
        </form>

        {message.text && (
          <p
            className={
              message.isError ? "text-color-red m-2" : "text-color-green m-2"
            }
          >
            {message.text}
          </p>
        )}

        <a
          href="/sign-up"
          className="text-white m-2 text-sm md:text-base hover:text-color-gold-card"
        >
          Back to Sign Up
        </a>
      </div>
    </div>
  );
};

export default VerifyEmail;
