import React, { useState, useEffect } from "react";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        console.log("ok", error);
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
      console.error("Error logging in", error);
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container-Login h-screen flex justify-center items-center px-5">
      <div className="content kodchasan-bold w-full md:w-3/4 lg:w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-4xl md:text-5xl lg:text-7xl m-3">
          LOGIN
        </h1>
        <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
        <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
          <UserInput
            type="text"
            id="usernameLogin"
            placeholder="Username..."
            name="username"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <UserInput
            type="password"
            id="passwordLogin"
            name="password"
            placeholder="Password..."
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="" className="text-color-yellow m-2 text-sm md:text-base">
            Forgot Password?..
          </a>
          <ButtonLogin text="Login" className="w-full md:w-1/2" />
        </form>
        <a href="/sign-up" className="text-white m-2 text-sm md:text-base">
          Don't have an account? Make an account...
        </a>
        <a
          href="./"
          className="absolute hover:text-color-yellow left-5 bottom-5 text-color-primary text-sm md:text-base">
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
