import { useEffect } from "react";
import React from "react";

const Hero = () => {
  useEffect(() => {
    // Cegah scroll horizontal tapi tetap izinkan scroll vertikal
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

    return () => {
      document.body.style.overflowX = "auto";
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="container-Hero max-h-screen overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center jura-medium">
        {/* Kiri */}
        <div className="w-full md:w-1/2 flex h-auto md:h-screen px-10 py-10 md:px-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl text-color-yellow kodchasan-bold my-4">
              Nongki-Yok
            </h1>
            <p className="text-base md:text-lg text-white my-2">
              Nongki-Yok: Temukan Kedai Kopi Asyik Buat Nongkrong!
            </p>
            <p className="text-sm md:text-base text-white text-justify my-2">
              Capek sama hiruk-pikuk kota? Pengen cari tempat ngopi yang asik
              buat nongkrong bareng teman atau sendirian? Website Nongki-Yok
              hadir sebagai solusi buat kamu yang pengen menemukan kedai kopi
              tersembunyi dengan suasana yang asik dan kopi yang nikmat! Selain
              itu, kami juga menyediakan informasi lengkap tentang kedai kopi,
              beserta restoran dan tempat makan lainnya yang ada di sekitar
              lokasi anda.
            </p>
            <a href="/map">
              <button className="bg-button-gray hover:bg-color-primary w-36 border-4 border-button-gray text-white py-2 px-4 rounded-lg my-5">
                Lihat Lokasi
              </button>
            </a>
          </div>
        </div>

        {/* Kanan */}
        <div className="w-full md:w-1/2 h-auto md:h-screen px-6 py-10 md:px-10 hidden md:flex flex-col justify-center relative">
          {/* Gambar latar belakang */}
          <img
            src="./img/Hero/Polygon-1.png"
            alt=""
            className="absolute w-2/3  h-5/6 bottom-0 right-0 -z-10 hidden md:block"
          />
          <img
            src="./img/Hero/Polygon-2.png"
            alt=""
            className="absolute w-2/3 h-5/6 bottom-0 right-0 -z-10 hidden md:block"
          />
          <img
            src="./img/Hero/coffee-image.png"
            alt=""
            className="absolute w-2/3 bottom-20 right-0 -z-10 hidden md:block"
          />
          <img
            src="./img/Ellipse.png"
            alt=""
            className="absolute top-[8rem] left-[4rem] -z-10"
          />
          <img
            src="./img/Ellipse.png"
            alt=""
            className="absolute bottom-[2rem] left-[30rem] -z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
