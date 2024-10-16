import React from "react";

const CardPlace = ({ src, title, desc }) => {
  return (
    <div
      className="max-w-md w-full bg-white rounded-lg shadow-md p-6 flex flex-col items-center m-4 
    drop-shadow-2xl border-2 justify-center"
    >
      <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        <img src={src} alt={desc} className="w-10 h-auto" />
      </div>
      <h1 className="text-2xl md:text-3xl mb-2 kodchasan-bold text-center">
        {title}
      </h1>
      <p className="text-gray-600 jura-medium text-center">{desc}</p>
    </div>
  );
};

export default CardPlace;
