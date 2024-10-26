import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CardPlace from "../../components/Card/CardPlace";
import TableDashboard from "../../components/Table/TableDashboard.jsx";
import Card from "../../components/Card/Card";
import axios from "axios";
import DOMPurify from "dompurify";

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [total, setTotal] = useState({});
  const [favorites, setFavorites] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [serverTime, setServerTime] = useState(null);
  // Fungsi untuk mengambil waktu dari server
  const fetchServerTime = async () => {
    try {
      const response = await axios.get(`${baseURL}/server-time`);
      setServerTime(new Date(response.data.currentTime)); // Simpan waktu dari server
    } catch (error) {
      console.error("Error fetching server time", error);
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);

        if (role !== "Guide" && role !== "Admin" && role !== "User") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    if (userRole === "Guide" || userRole === "Admin") {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/FavPlaces`, {
            withCredentials: true,
          });
          setFavorites(response.data);
        } catch (error) {
          console.error("Error fetching favorite places", error);
        }
      };
      fetchServerTime();
      fetchFavorites();
    }

    if (userRole === "User") {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/api/personal/Favplaces`,
            {
              withCredentials: true,
            }
          );
          setFavorites(response.data);
        } catch (error) {
          console.error("Error fetching favorite places", error);
        }
      };
      fetchFavorites();
    }
    if (userRole === "Guide" || userRole === "Admin") {
      const fetchTotal = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/AllPlaces`, {
            withCredentials: true,
          });
          setTotal(response.data);
        } catch (error) {
          console.error("Error fetching total places", error);
        }
      };

      fetchTotal();
      const fetchCards = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/card/fav`, {
            withCredentials: true,
          });
          setCards(response.data);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      };

      fetchCards();
    } else if (userRole === "User") {
      const fetchCards = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/card/fav`, {
            withCredentials: true,
          });
          setCards(response.data);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      };

      fetchCards();
    }
  }, [userRole, navigate]);
  const removeHtmlTags = (html) => {
    const cleanHtml = DOMPurify.sanitize(html);
    return cleanHtml.replace(/<[^>]*>/g, ""); // Menghapus semua tag HTML
  };
  const truncateDescription = (text, maxLength = 150) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
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
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <CardPlace
          src={
            userRole === "Guide" || userRole === "Admin"
              ? "./img/Card/star.png"
              : "./img/Card/bookmarks.png"
          }
          title={favorites.total_favorites || 0}
          desc={
            userRole === "Guide" || userRole === "Admin"
              ? "Tempat Populer"
              : "Wishlist"
          }
        />
        {(userRole === "Guide" || userRole === "Admin") && (
          <CardPlace
            src={"./img/Card/Map.png"}
            title={total.total ? total.total : 0}
            desc={"Tempat yang ditambahkan"}
          />
        )}
      </div>
      <div>
        {/* Hanya Guide dan Admin yang bisa melihat TableDashboard */}
        {userRole === "Guide" || userRole === "Admin" ? (
          <TableDashboard />
        ) : null}
        {(userRole === "User" ||
          userRole === "Guide" ||
          userRole === "Admin") && (
          <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
            <h1 className="text-2xl ml-[8%] kodchasan-bold text-white">
              Lokasi Favorite Mu
            </h1>
            <div className="container-card flex justify-center flex-wrap items-stretch gap-4 p-4">
              {cards.map((card, index) => (
                <Card
                  placeId={card.Id_Places}
                  key={index}
                  title={card.Name}
                  imgSrc={
                    card.Image ? `./${card.Image}` : "./img/Card/image-ex.png"
                  }
                  description={removeHtmlTags(
                    truncateDescription(card.Description)
                  )}
                  link={card.Link}
                  isOpen={checkIsOpen(card.Open, card.Close)}
                  price={card.AVG_Price}
                  category={card.Category}
                  size={card.Size}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
