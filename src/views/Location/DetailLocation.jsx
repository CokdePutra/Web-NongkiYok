import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const DetailLocation = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/review/${id}`, {
          withCredentials: true,
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/get/places/${id}`, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData();
  }, [id]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? "★" : "";
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 pt-10 text-white">
        {/* Image Section */}
        <div className="flex justify-center mb-8">
          <img
            src={data.Image ? `../${data.Image}` : "../img/Card/image-ex.png"}
            alt={data.Name}
            className="rounded-lg shadow-lg max-w-4xl md:w-2/3"
          />
        </div>

        {/* Location Details */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2">
            <a
              href={data.Link}
              target="_blank"
              className="hover:text-color-yellow transition-colors duration-300 ease-in-out decoration-transparent hover:decoration-color-yellow cursor-pointer"
            >
              {data.Name}
            </a>
          </h1>
          <p className="text-2xl text-yellow-400">
            Average Price: {rupiah(data.AVG_Price)}
          </p>
          <div className="info gap-1 mt-2">
            <span className="inline-flex mt-1 mx-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-md font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {data.Category}
            </span>
            <span className="inline-flex mt-1 items-center self-start rounded-md bg-color-yellow px-2 py-1 text-md font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {data.Size}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-300 mb-12 text-start px-5 md:px-20 text-xl">
          <p dangerouslySetInnerHTML={{ __html: data.Description }}></p>
        </div>
        <div className="flex justify-center">
          <a
            href="/homecard"
            className="bg-color-yellow text-black py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-color-gold-card hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-yellow mb-5"
          >
            Back
          </a>
        </div>

        {/* Reviews Section */}
        <div className="mb-10 px-5">
          <h2 className="text-2xl font-bold mb-5">
            Location Review ({reviews.length})
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.Id}>
                <div className="p-5 bg-gray-800 rounded-xl shadow-lg">
                  {/* Header dengan Nama dan Tanggal */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-400">
                      by {review.Username}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(review.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">
                      {renderRatingStars(review.Rating)}
                    </span>
                  </div>

                  {/* Isi Review */}
                  <p className="text-gray-300 text-sm mb-2">
                    {review.Review.length > 100
                      ? `${review.Review.substring(0, 100)}...`
                      : review.Review}
                  </p>

                  {/* Link untuk Lihat Lebih Banyak */}
                  <a href="#" className="text-yellow-400 text-sm">
                    See More
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default DetailLocation;
