import React from "react";

const UserInput = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  inputMode,
  Isdisabled,
}) => {
  return (
    <div className="formInput w-full">
      <input
        disabled={Isdisabled}
        autoComplete="off"
        required
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        className={`bg-hover-button text-black rounded-full h-9 p-5 m-2 w-full ${className}`}
      />
    </div>
  );
};

export default UserInput;
