import React from "react";

const UserInput = ({ type = "text", id, placeholder, className }) => {
  return (
    <>
      <div className="formInput">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`bg-hover-button text-black rounded-full h-9 p-5 m-2 w-full ${className}`}
        />
      </div>
    </>
  );
};
export default UserInput;
