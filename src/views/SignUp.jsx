import React from "react";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";

function SignUp() {
  return (
    <>
      <div className="container-Login h-screen flex justify-center items-center">
        <div className="content kodchasan-bold w-1/4 flex flex-col items-center">
          <h1 className="text-color-yellow text-7xl m-3">SIGN UP</h1>
          <div className="border-b-4 border-color-yellow m-5 h-2 w-full"></div>
          <UserInput
            type="email"
            id="emailSignUp"
            placeholder="Email..."
            className="w-full"
          />
          <div className="flex w-full space-x-2">
            <UserInput
              type="text"
              id="namaSignUp"
              placeholder="Nama..."
              className="w-full"
            />
            <UserInput
              type="text"
              id="usernameSignUp"
              placeholder="Username..."
              className="w-full"
            />
          </div>
          <UserInput
            type="password"
            id="passwordLogin"
            placeholder="Password..."
            className="w-full"
          />
          <a href="" className="text-color-yellow m-2">
            Forgot Password?..
          </a>
          <ButtonLogin text="Sign-In" className="w-1/2" />
          <a
            href="./"
            className="absolute hover:text-white left-5 bottom-5 text-color-primary ">
            Back
          </a>
        </div>
        <img
          src="./img/Login/Polygon1.png"
          alt=""
          className="absolute w-1/5  bottom-0 left-0 -z-10"
        />
        <img
          src="./img/Login/Polygon2.png"
          alt=""
          className="absolute w-1/5  top-0 right-0 -z-10"
        />
        <img
          src="./img/Login/Ellipse.png"
          alt=""
          className="absolute w-1/10  top-[5rem] left-[4rem] -z-10"
        />
        <img
          src="./img/Login/Ellipse.png"
          alt=""
          className="absolute w-1/10  bottom-[2rem] right-[4rem] -z-10"
        />
      </div>
    </>
  );
}
export default SignUp;
