import React from "react";
import UserInput from "../components/UserInput/UserInput";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";

const SignUp = () => {
  return (
    <>
      <div className="container-SignUp h-screen flex justify-center items-center">
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
              name="nama"
              placeholder="Nama..."
              className="w-full"
            />
            <UserInput
              type="text"
              id="usernameSignUp"
              name="username"
              placeholder="Username..."
              className="w-full"
            />
          </div>
          <UserInput
            type="password"
            name="password"
            id="passwordLogin"
            placeholder="Password..."
            className="w-full"
          />
          <ButtonLogin text="Sign-In" className="w-1/2 my-4" />
          <a href="/login" className="text-white m-2">
            Already Have account? Login...
          </a>
          <a
            href="./"
            className="absolute hover:text-color-yellow left-5 bottom-5 text-color-primary ">
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
};
export default SignUp;
