import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const DetailLocation = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 pt-10 text-white">
        {/* Image Section */}
        <div className="flex justify-center mb-8">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Kopi Kenangan"
            className="rounded-lg shadow-lg w-full md:w-2/3"
          />
        </div>

        {/* Location Details */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Kopi Kenangan</h1>
          <p className="text-xl text-yellow-400">AVG: Rp. 60.000</p>
          <div className="info gap-1 mt-2">
            <span className="inline-flex mt-1 mx-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              large
            </span>
            <span className="inline-flex mt-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              medium
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-300 mb-12 text-start px-5 md:px-20 text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            voluptatibus eos ipsum, voluptate cupiditate dolores mollitia quasi
            sint eveniet dolorum excepturi beatae harum magnam fuga aut quis
            maiores praesentium. Facere atque nobis assumenda magni dolore,
            corporis consequuntur debitis impedit esse molestiae veritatis ea
            eos nemo quae, ad at autem optio ducimus! Nostrum quas, expedita
            quis dicta est aut quisquam saepe qui adipisci dolorum molestias
            aliquam libero tempore quia eum esse nihil? Sunt eveniet neque iure
            cumque suscipit amet officia assumenda at vero nulla aliquam esse
            optio modi blanditiis, magni sequi. Pariatur consectetur minima ea
            at a minus, nostrum ullam nam consequatur odit, obcaecati corporis
            fugiat! Pariatur optio minus ducimus ea saepe. Natus nulla ipsum
            suscipit aut. Nemo ipsum, aspernatur culpa tenetur illo, ex, eum
            vero quis doloremque dicta nesciunt temporibus! Aperiam fugiat iure
            optio! Minus magnam eos dolore officia? Molestiae dolorum cupiditate
            iste iure eveniet enim accusamus laudantium vero, dolore dolor non
            praesentium deleniti. Repellat aliquid ratione, illo debitis amet
            vero soluta. Quas pariatur quisquam laudantium blanditiis nihil
            vitae tenetur, omnis similique magnam molestias quam dicta quos
            laborum quasi vero dolor mollitia ea ad aliquam sequi consequuntur?
            Repellendus animi, exercitationem cum vero harum esse assumenda
            eligendi natus eveniet hic tempore, rerum velit doloremque
            consectetur sunt laudantium molestias soluta perspiciatis sequi.
            Architecto harum tempora ut recusandae, beatae, fugit obcaecati
            ipsam dignissimos a natus eveniet veritatis, dicta magnam illo amet
            eius mollitia corporis cumque maiores. Natus aliquam atque, ipsa
            aliquid a dignissimos voluptate illum fugit eveniet hic odit
            nesciunt quasi fuga ut quisquam rerum culpa dolores asperiores
            repellat voluptatem aut. Deleniti voluptas aliquam consequatur
            sapiente eaque ullam similique est at, doloremque labore animi eius
            cupiditate dolores officiis, molestiae quas in ad iusto eum, laborum
            reprehenderit praesentium? Autem sapiente, quam consectetur eius
            excepturi ex officiis repellendus exercitationem nisi, in illo
            minima delectus quos.
          </p>
        </div>

        {/* Review Section */}
        <div className="mb-10 px-5">
          <h2 className="text-2xl font-bold mb-5">Location Review (5)</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={2} // Default tampilkan 2 slide
            breakpoints={{
              640: {
                slidesPerView: 2, // Tampilkan 2 review untuk layar kecil
              },
              768: {
                slidesPerView: 3, // Tampilkan 3 review untuk layar medium
              },
              1024: {
                slidesPerView: 4, // Tampilkan 4 review untuk layar besar
              },
            }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="w-full"
          >
            {/* Contoh Review */}
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                {/* Header dengan Nama dan Tanggal */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by zayuran
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★☆</span>
                </div>

                {/* Isi Review */}
                <p className="text-gray-300 text-sm mb-2">
                  Aliquam neque odio, ullamcorper vitae interdum a, dictum vitae
                  diam. Donec convallis in arcu eu ornare. Nulla maximus, ante
                  non ullamcorper ultrices, orci magna tempus neque...
                </p>

                {/* Link untuk Lihat Lebih Banyak */}
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>

            {/* Slide Tambahan */}
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by gmoons
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Etiam arcu arcu, cursus ut dolor in, rutrum mollis est. Proin
                  arcu turpis, sollicitudin quis maximus sit amet.
                </p>
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by gmoons
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Etiam arcu arcu, cursus ut dolor in, rutrum mollis est. Proin
                  arcu turpis, sollicitudin quis maximus sit amet.
                </p>
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by gmoons
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Etiam arcu arcu, cursus ut dolor in, rutrum mollis est. Proin
                  arcu turpis, sollicitudin quis maximus sit amet.
                </p>
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by gmoons
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Etiam arcu arcu, cursus ut dolor in, rutrum mollis est. Proin
                  arcu turpis, sollicitudin quis maximus sit amet.
                </p>
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    by gmoons
                  </span>
                  <span className="text-sm text-gray-400">13 Oct 2024</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Etiam arcu arcu, cursus ut dolor in, rutrum mollis est. Proin
                  arcu turpis, sollicitudin quis maximus sit amet.
                </p>
                <a href="#" className="text-yellow-400 text-sm">
                  See More
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default DetailLocation;
