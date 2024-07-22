import React from "react";
import UserInput from "../components/UserInput/UserInput";

function Login() {
  return (
    <>
      <div className="container-Login max-h-screen flex justify-center items-center">
        <div className="content kodchasan-bold w-1/4 flex flex-col items-center">
          <h1 className="text-color-yellow text-7xl m-3">LOGIN</h1>
          <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
          <UserInput
            type="text"
            id="usernameLogin"
            placeholder="Username..."
            className="w-full"
          />
          <UserInput
            type="password"
            id="passwordLogin"
            placeholder="Password..."
            className="w-full"
          />
          <a href="" className="text-color-yellow m-2">
            Forgot Password?..
          </a>
        </div>
      </div>
    </>
  );
}
export default Login;
