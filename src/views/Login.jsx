import React, { useState, useEffect } from "react";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk show password
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });
        const role = response.data.role;
        // Redirect if already logged in
        if (role === "Guide") {
          navigate("/dashboard");
        } else if (role === "Admin") {
          navigate("/Admin");
        } else if (role === "User") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching session data");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/login`,
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const redirectUrl = response.data.redirectUrl;
        navigate(redirectUrl);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email is not verified",
          footer: `<a href="${error.response.data.verifyUrl}">Verify here</a>`,
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text: "Please check your username and password.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="container-Login h-screen flex justify-center items-center px-5">
      <div className="content kodchasan-bold w-full md:w-3/4 lg:w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-4xl md:text-5xl lg:text-7xl m-3">
          LOGIN
        </h1>
        <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center"
        >
          <UserInput
            type="text"
            id="usernameLogin"
            placeholder="Username..."
            name="username"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative w-full">
            <UserInput
              type={showPassword ? "text" : "password"} // Ubah type berdasarkan state
              id="passwordLogin"
              name="password"
              placeholder="Password..."
              className="w-full pr-10" // Tambahkan padding untuk space icon
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-1/2 mt-[4px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
            >
              <box-icon
                name={showPassword ? "hide" : "show"}
                type="solid"
              ></box-icon>
            </span>
          </div>
          <a
            href="/reset-pw"
            className="text-color-yellow m-2 text-sm md:text-base hover:text-color-gold-card"
          >
            Forgot Password?..
          </a>
          <ButtonLogin
            text="Login"
            className="w-full md:w-1/2 hover:bg-color-gold-card"
          />
        </form>
        <a
          href="/sign-up"
          className="text-white m-2 text-sm md:text-base hover:text-color-gold-card"
        >
          Don't have an account? Make an account...
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

export default Login;
