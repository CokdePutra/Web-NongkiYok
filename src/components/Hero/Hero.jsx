import { useEffect } from "react";
import React from "react";

const Hero = () => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Clean up to enable scrolling again when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <div className="container-Hero max-h-screen place-items-center">
        <div class="content flex jura-medium">
          <div class="left w-1/2 flex h-[80vh] mx-10 p-4 ">
            <div class="flex flex-col justify-center">
              <div class="title text-6xl text-color-yellow kodchasan-bold my-2">
                Nongki-Yok
              </div>
              <div className="sub-title text-lg text-white my-1">
                Nongki-Yok: Temukan Kedai Kopi Asyik Buat Nongkrong!
              </div>
              <div class="description text-base text-white text-justify my-1">
                Capek sama hiruk-pikuk kota? Pengen cari tempat ngopi yang asik
                buat nongkrong bareng teman atau sendirian? Aplikasi Nongki-Yok
                hadir sebagai solusi buat kamu yang pengen menemukan kedai kopi
                tersembunyi dengan suasana yang asik dan kopi yang nikmat!
              </div>
              <a href="/map">
                <button className="bg-button-gray hover:bg-color-primary w-36 border-solid border-4 border-button-gray text-white py-2 px-4 rounded-lg my-5">
                  Lihat Lokasi
                </button>
              </a>
            </div>
          </div>
          <div class="right w-1/2  flex-col justify-center h-screen mx-10 p-4 hidden md:flex">
            <div className="">
              <img
                src="./img/Hero/Polygon-1.png"
                alt=""
                className="absolute w-1/2 h-5/6 bottom-0 right-0 -z-10 hidden md:block"
              />
              <img
                src="./img/Hero/Polygon-2.png"
                alt=""
                className="absolute w-1/2 h-5/6 bottom-0 right-0 -z-10 hidden md:block"
              />
              <img
                src="./img/Hero/coffee-image.png"
                alt=""
                className="absolute w-1/3  bottom-20 right-0 -z-10 hidden md:block"
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
      </div>
    </>
  );
};

export default Hero;
