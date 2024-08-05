import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        ...formData,
        role: "User",
      });
      setMessage({ text: response.data, isError: false });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage({
        text: "Registration failed. Please try again.",
        isError: true,
      });
    }
  };

  return (
    <div className="container-SignUp h-screen flex justify-center items-center">
      <div className="content kodchasan-bold w-1/4 flex flex-col items-center">
        <h1 className="text-color-yellow text-7xl m-3">SIGN UP</h1>
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
          <div className="flex w-full space-x-2">
            <UserInput
              type="text"
              name="name"
              placeholder="Nama..."
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
            <UserInput
              type="text"
              name="username"
              placeholder="Username..."
              value={formData.username}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <UserInput
            type="password"
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-center">
            <ButtonLogin text="Sign-Up" className="w-1/2 my-4" />
          </div>
        </form>
        {message.text && (
          <p
            className={
              message.isError ? "text-color-red m-2" : "text-color-green m-2"
            }>
            {message.text}
          </p>
        )}
        <a href="/login" className="text-white m-2">
          Already have an account? Login...
        </a>
        <a
          href="./"
          className="absolute hover:text-color-yellow left-5 bottom-5 text-color-primary">
          Back
        </a>
      </div>
      <img
        src="./img/Login/Polygon1.png"
        alt=""
        className="absolute w-1/5 bottom-0 left-0 -z-10"
      />
      <img
        src="./img/Login/Polygon2.png"
        alt=""
        className="absolute w-1/5 top-0 right-0 -z-10"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/10 top-[5rem] left-[4rem] -z-10"
      />
      <img
        src="./img/Login/Ellipse.png"
        alt=""
        className="absolute w-1/10 bottom-[2rem] right-[4rem] -z-10"
      />
    </div>
  );
};

export default SignUp;
