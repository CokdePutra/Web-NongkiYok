import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import Swal from "sweetalert2";

const SignUp = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL; // URL dari API Backend
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk mengelola visibilitas password
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Password minimal 6 karakter
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validasi email
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Email is invalid");
      } else {
        setEmailError("");
      }
    }

    // Validasi nama
    if (name === "name") {
      if (value.trim() === "") {
        setNameError("Name cannot be empty");
      } else {
        setNameError("");
      }
    }

    // Validasi username
    if (name === "username") {
      if (value.trim().length < 4) {
        setUsernameError("Username minimum 4 characters");
      } else {
        setUsernameError("");
      }
    }

    // Validasi password
    if (name === "password") {
      if (!validatePassword(value)) {
        setPasswordError("Password must be 6 characters or more");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Cek jika ada error
    if (emailError || nameError || usernameError || passwordError) {
      Swal.fire({
        title: "The form is invalid!",
        text: "Check your input. There are invalid fields.",
        icon: "error",
      });
      setMessage({
        text: "The form is invalid. Check your input.",
        isError: true,
      });
      return;
    }

    // Mulai loading
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/register`, {
        ...formData,
        role: "User",
      });
      Swal.fire({
        title: "Registration successful!",
        text: "Check your email for verification.",
        icon: "warning",
      });
      // Beri pesan sukses dan arahkan pengguna ke halaman verifikasi
      setMessage({
        text: "Registration successful! Check your email for verification.",
        isError: false,
      });
      navigate(`/verify-email/${formData.email}`); // Kirim email ke halaman verifikasi
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Registration Failed!",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Registration Failed!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
      setMessage({
        text: "Registration Failed. Please try again.",
        isError: true,
      });
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah request selesai
    }
  };

  return (
    <div className="container-SignUp h-screen flex justify-center items-center px-5">
      <div className="content kodchasan-bold w-full md:w-3/4 lg:w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-4xl md:text-5xl lg:text-7xl m-3">
          SIGN UP
        </h1>
        <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
        <form onSubmit={handleSignUp} className="w-full">
          <UserInput
            type="email"
            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
          {emailError && <p className="text-color-red text-sm">{emailError}</p>}

          <UserInput
            type="text"
            name="name"
            placeholder="Nama..."
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />
          {nameError && <p className="text-color-red text-sm">{nameError}</p>}

          <UserInput
            type="text"
            name="username"
            placeholder="Username..."
            value={formData.username}
            onChange={handleChange}
            className="w-full"
          />
          {usernameError && (
            <p className="text-color-red text-sm">{usernameError}</p>
          )}

          <div className="relative w-full">
            <UserInput
              type={showPassword ? "text" : "password"} // Mengubah type berdasarkan state showPassword
              name="password"
              placeholder="Password..."
              value={formData.password}
              onChange={handleChange}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
              className="absolute right-3 top-3 mt-[4px]"
            >
              <box-icon
                name={showPassword ? "hide" : "show"} // Ganti ikon berdasarkan state
                type="solid"
              ></box-icon>
            </button>
          </div>
          {passwordError && (
            <p className="text-color-red text-sm">{passwordError}</p>
          )}

          <div className="flex justify-center">
            <ButtonLogin
              text={isLoading ? "Processing..." : "Sign-Up"} // Ganti text tombol jika sedang loading
              className="w-full md:w-1/2 my-4 hover:bg-color-gold-card"
              disabled={isLoading} // Disable tombol saat loading
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
          href="/login"
          className="text-white m-2 text-sm md:text-base hover:text-color-gold-card"
        >
          Already have an account? Login...
        </a>
        <a
          href="./"
          className="absolute hover:text-color-gold-card left-5 bottom-5 text-color-primary text-sm md:text-base"
        >
          Back
        </a>
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

export default SignUp;
