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
import Swal from "sweetalert2";

const DetailLocation = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const { id } = useParams();
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [UserReview, setUserReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [IdUser, setIdUser] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseURL}/api/session`, { withCredentials: true })
      .then((response) => {
        if (response.data && response.data.id) {
          setIsLoggedIn(true);
          setIdUser(response.data.id);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
        setIsLoggedIn(false); // In case of error, user is not logged in
      });
  }, []);

  // Menghitung Avg rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.Rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const AverageRating = calculateAverageRating();
  const fetchServerTime = async () => {
    try {
      const response = await axios.get(`${baseURL}/server-time`);
      setServerTime(new Date(response.data.currentTime)); // Simpan waktu dari server
    } catch (error) {
      console.error("Error fetching server time", error);
    }
  };
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
    fetchServerTime();
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

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const HandleClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Error!",
        text: "Please login first to add review.",
        icon: "error",
      });
    } else {
      setIsPopupOpen(true);
    }
  };
  const HandleClickReport = (reviewId) => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Error!",
        text: "Please login first to report a review.",
        icon: "error",
      });
    } else {
      handleReport(reviewId);
    }
  };
  const handleReviewSubmit = async () => {
    if (selectedRating === 0 || UserReview.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "Please provide both a rating and a review.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/review/add`,
        {
          PlaceId: id,
          Rating: selectedRating,
          Review: UserReview,
        },
        {
          withCredentials: true,
        }
      );

      setReviews([
        ...reviews,
        {
          ...response.data,
          Rating: selectedRating,
          Review: UserReview,
          Username: "Your Username",
        },
      ]);
      setIsPopupOpen(false);
      setUserReview("");
      setSelectedRating(0);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error submitting review. Please try again later.",
        icon: "error",
      });
      console.error("Error submitting review:", error);
    }
  };

  const handleReport = async (reviewId) => {
    const user_id = IdUser;
    try {
      // Tampilkan konfirmasi dengan Swal
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You sure want to report this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Report it!",
      });

      if (result.isConfirmed) {
        const response = await axios.post(`${baseURL}/api/report-review`, {
          reviewId,
          user_id,
        });
        Swal.fire({
          title: "Report Submitted!",
          text: response.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error Reporting Review",
        text: "Error reporting the review. Please try again later.",
        icon: "error",
      });
    }
  };
  // Fungsi untuk mengecek apakah tempat buka atau tutup berdasarkan waktu server
  const checkIsOpen = (openTime, closeTime) => {
    if (!serverTime) return false;

    // Ambil jam, menit, dan detik dari serverTime
    const currentTime = new Date(serverTime);
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    // Parsing openTime dan closeTime sebagai waktu tanpa 'Z' (zona waktu UTC)
    const open = new Date(`1970-01-01T${openTime}`);
    const close = new Date(`1970-01-01T${closeTime}`);

    // Konversi waktu server menjadi objek Date pada tanggal 1970-01-01 untuk perbandingan
    const currentParsed = new Date(
      `1970-01-01T${currentHours.toString().padStart(2, "0")}:${currentMinutes
        .toString()
        .padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`
    );

    console.log(
      "Parsed Server Time :",
      currentParsed,
      "Open Time :",
      open,
      "Close Time :",
      close
    );

    // Jika close time lebih awal dari open time (lewat tengah malam)
    if (close < open) {
      // Buka dari openTime hingga 23:59:59 atau dari 00:00:00 hingga closeTime
      if (currentParsed >= open || currentParsed < close) {
        return true;
      }
    } else {
      // Buka dalam interval normal
      if (currentParsed >= open && currentParsed < close) {
        return true;
      }
    }

    return false;
  };
  const isOpen = checkIsOpen(data.Open, data.Close);
  const simplifyTime = (time24h) => {
    if (!time24h || typeof time24h !== "string") {
      return "Invalid time format";
    }

    const [hour, minute] = time24h.split(":");
    let hour12 = parseInt(hour, 10);
    const period = hour12 >= 12 ? " PM" : " AM";
    hour12 = hour12 % 12 || 12;

    return `${hour12}${period}`;
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
            className="rounded-lg shadow-lg max-w-=3xl md:w-3/4"
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
          {isOpen ? (
            <span className="inline-flex items-center justify-start rounded-md bg-green-700 px-2 py-1 text-md font-medium text-yellow-400 ring-1 ring-inset ring-yellow-600/20 mt-4">
              <box-icon
                name="time-five"
                color="#FCBC36"
                type="solid"
                className="mr-1"
                size="20px"
              ></box-icon>
              &nbsp;Open until {simplifyTime(data.Close)}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-1 text-md font-medium text-yellow-400 ring-1 ring-inset ring-yellow-600/20 mt-4">
              <box-icon
                name="time-five"
                color="#FCBC36"
                type="solid"
                className="mr-1"
                size="20px"
              ></box-icon>
              &nbsp;Close and Open at {simplifyTime(data.Open)}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="text-gray-300 mb-7 text-start px-5 md:px-20 text-xl">
          <p dangerouslySetInnerHTML={{ __html: data.Description }}></p>
        </div>
        <div className="flex justify-start ml-[5.5%]">
          <a
            href="/homecard"
            className="bg-color-yellow text-black py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-color-gold-card hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-yellow mb-10 inline-flex items-center space-x-2"
          >
            <box-icon name="arrow-back" className="w-5 h-5"></box-icon>
            <span>Back</span>
          </a>
        </div>

        {/* Reviews Section */}
        <div className="mb-10 px-5">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-4xl font-bold">Location Review</h2>
            <button
              className="bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-green-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 inline-flex items-center justify-center"
              onClick={() => HandleClick()}
            >
              <box-icon
                name="news"
                type="solid"
                color="#ffffff"
                className="w-5 h-5"
              ></box-icon>
              <span className="ml-2">Reviews</span>
            </button>
          </div>
          <h3 className="text-2xl font-bold mb-5">
            {AverageRating} / 5{" "}
            <span className="text-yellow-400">
              {renderRatingStars(AverageRating)}
            </span>{" "}
            ({reviews.length})
          </h3>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={15}
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
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.Id}>
                <div className="px-4 pb-8 pt-3 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  {/* Icon untuk melaporkan review */}
                  <div className="flex justify-end items-center mb-3 cursor-pointer">
                    <box-icon
                      name="flag-alt"
                      type="solid"
                      color="#edeff2"
                      size="20px"
                      onClick={() => HandleClickReport(review.Id_Review)}
                    ></box-icon>
                  </div>

                  {/* Info Pengguna dan Tanggal Review */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-md font-medium text-gray-400">
                      by {review.Username}
                    </span>
                    <span className="text-md text-gray-400">
                      {new Date(review.created_at).toLocaleDateString("en-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Rating Review */}
                  <div className="flex items-center mb-3 text-lg">
                    <span className="text-yellow-400">
                      {renderRatingStars(review.Rating)}
                    </span>
                  </div>

                  {/* Isi Review */}
                  <p className="text-gray-300 text-md mb-2">
                    {review.Review.length > 100
                      ? `${review.Review.substring(0, 100)}...`
                      : review.Review}
                  </p>

                  {/* Link untuk Lihat Lebih Banyak jika review terlalu panjang */}
                  {review.Review.length > 45 && (
                    <a
                      href={`/reviews/${review.Id}`}
                      className="text-yellow-400 text-sm"
                    >
                      See More
                    </a>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Popup untuk AI */}
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-md relative">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Rate Location
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                  onClick={() => setIsPopupOpen(false)} // Menutup popup
                >
                  &times;
                </button>
              </div>
              <hr className="my-1 mb-3 border-t border-gray-300" />

              {/* Bintang Rating */}
              <div className="flex justify-center mb-4 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <box-icon
                    key={star}
                    name="star"
                    color="#FCBC36"
                    Size="35px"
                    type={selectedRating >= star ? "solid" : "regular"}
                    onClick={() => handleRatingClick(star)}
                    className="cursor-pointer w-8 h-8"
                  />
                ))}
              </div>

              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 text-black focus:ring-slate-500"
                rows="4"
                placeholder="Type your Review."
                value={UserReview}
                onChange={(e) => setUserReview(e.target.value)}
              ></textarea>
              <button
                className="mt-4 w-full bg-color-yellow text-black py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailLocation;
