import React from "react";

const Card = ({ title, imgSrc, description, link, price,category }) => {
  // Fungsi untuk menghitung jumlah ikon uang berdasarkan harga
  const getMoneyIcons = (price) => {
    if (price < 35000) {
      return 1;
    } else if (price >= 35000 && price <= 60000) {
      return 2;
    } else if (price < 80000) {
      return 3;
    }
  };

  // Buat array yang panjangnya sesuai dengan jumlah ikon uang yang akan ditampilkan
  const moneyIcons = Array.from({ length: getMoneyIcons(price) });

  return (
    <div className="card bg-navbar-color rounded-lg shadow-lg p-6 m-4 w-[20rem] flex flex-col overflow-hidden">
      <img
        src={imgSrc}
        alt="img-card"
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <span className="inline-flex mt-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        {category}
      </span>
      <h1 className="title kodchasan-bold text-2xl mt-1 text-white">{title}</h1>
      <p className="description text-gray-300 mt-2">{description}</p>
      <div className="flex justify-between mt-4">
        <div className="icon-money flex items-center">
          {moneyIcons.map((_, index) => (
            <img
              key={index}
              src="./img/Card/money.png"
              alt="icon-money"
              className="h-6 w-6"
            />
          ))}
        </div>
        <a href={link} target="_blanks">
          <div className="icon-location flex items-center">
            <img
              src="./img/Card/location.png"
              alt="icon-location"
              className="h-6 w-6"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Card;
