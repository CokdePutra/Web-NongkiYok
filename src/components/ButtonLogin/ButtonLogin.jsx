import React from "react";

function ButtonLogin({ text, className }) {
  return (
    <>
      <button
        className={`bg-color-yellow text-black py-2 px-4 rounded-full ${className}`}>
        {text}
      </button>
    </>
  );
}
export default ButtonLogin;
