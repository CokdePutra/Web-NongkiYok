import React, { useState } from "react";
import axios from "axios";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        role: "User", // Set default role as "User"
        username,
      });
      setMessage(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Registration failed. Please try again.");
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
            id="emailSignUp"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <div className="flex w-full space-x-2">
            <UserInput
              type="text"
              id="namaSignUp"
              name="name"
              placeholder="Nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <UserInput
              type="text"
              id="usernameSignUp"
              name="username"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <UserInput
            type="password"
            name="password"
            id="passwordSignUp"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-center">
            <ButtonLogin text="Sign-Up" className="w-1/2 my-4" />
          </div>
        </form>
        {message && <p className="text-white m-2">{message}</p>}
        <a href="/login" className="text-white m-2">
          Already have an account? Login...
        </a>
        <a
          href="./"
          className="absolute hover:text-color-yellow left-5 bottom-5 text-color-primary"
        >
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
