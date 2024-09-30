import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import FloatingSearchBar from "../../components/Navbar/FloatingSearchBar";
import InfoAlert from "../../components/alert/AlertsInfo";

const HomeCard = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [cards, setCards] = useState([]);
  const [sortOrder, setSortOrder] = useState("up");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State untuk popup
  const [criteria, setCriteria] = useState(""); // State untuk menyimpan kriteria
  const [loadingAI, setLoadingAI] = useState(false);
  const [alert, setAlert] = useState(false);
  // Fetch data ketika halaman dimuat atau ada perubahan pada state filter
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/card/${sortOrder}?size=${selectedSize}&category=${selectedCategory}`
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [sortOrder, selectedSize, baseURL, selectedCategory]);

  // Fungsi untuk meng-handle pencarian
  const handleSearchResults = (results) => {
    if (results.length === 0) {
      console.log("No results found");
    }
    setCards(results); // Update cards dengan hasil pencarian
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsFilterOpen(false);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setIsFilterOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setSortOrder("up");
    setSelectedSize("");
    setSelectedCategory("");
  };

  const handlePopupSubmit = async () => {
    setLoadingAI(true);
    setAlert(true);
    try {
      const response = await axios.get(`${baseURL}/gemini`, {
        params: { kriteria: criteria },
      });

      setCards(response.data);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error fetching cards with criteria:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <>
      <Navbar />
      <FloatingSearchBar onSearchResults={handleSearchResults} />{" "}
      {/* Terhubung dengan search bar */}
      {alert && (
        <InfoAlert
          title="this is it for you!"
          text="Here are the recommended places by Gemini, based on your criteria."
          link={"/homecard"}
          linkname="Reset Suggestions"
        />
      )}
      <div className="container-card flex flex-wrap justify-center items-stretch gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            placeId={card.Id_Places}
            key={index}
            title={card.Name}
            imgSrc={card.Image ? `./${card.Image}` : "./img/Card/image-ex.png"}
            description={card.Description}
            link={card.Link}
            price={card.AVG_Price}
            category={card.Category}
            size={card.Size}
          />
        ))}
      </div>
      <div className="mt-2 ml-3 mb-4 fixed bottom-3 left-1">
        <img
          src="./img/Card/Tune.png"
          alt="Filter"
          className="w-[58%] h-[auto] cursor-pointer"
          onClick={() => setIsFilterOpen(true)}
        />
      </div>
      <div className="mt-2 ml-3 mb-4 fixed bottom-3 right-1">
        <img
          src="./img/Card/AI2.png"
          alt="AI"
          className="cursor-pointer"
          onClick={() => setIsPopupOpen(true)} // Membuka popup saat diklik
        />
      </div>
      {/* Popup untuk AI */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-md relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-4">Input Criteria</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                onClick={() => setIsPopupOpen(false)} // Menutup popup
              >
                &times;
              </button>
            </div>
            <hr className="my-1 mb-3 border-t border-gray-300" />
            <div className="mb-4">
              <p className="text-gray-700">
                Enter your criteria to get the best recommendation for you.
                Powered by Gemini AI.
              </p>
            </div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              rows="4"
              placeholder="Type your Criteria."
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
            ></textarea>
            <button
              disabled={loadingAI}
              className="mt-4 w-full bg-color-yellow text-black py-2 rounded-lg hover:bg-color-gold-card"
              onClick={handlePopupSubmit} // Meng-handle submit
            >
              {loadingAI ? (
                <div className="animate-spin flex justify-center items-center dura">
                  <box-icon name="loader" color="#000000" size="sm"></box-icon>
                </div>
              ) : (
                <div>Suggess me a place!</div>
              )}
            </button>
          </div>
        </div>
      )}
      {/* Popup untuk filter */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-md relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-4">SORT BY</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold mt-[-7%]"
                onClick={() => setIsFilterOpen(false)}
              >
                &times;
              </button>
            </div>
            <hr className="my-1 mb-3 border-t border-gray-300" />
            <ul className="space-y-4">
              {/* Filter Harga */}
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg flex items-center hover:bg-gray-100 ${
                    sortOrder === "up" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSort("up")}
                >
                  Highest Price
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg flex items-center hover:bg-gray-100 ${
                    sortOrder === "down" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSort("down")}
                >
                  Lowest Price
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 ${
                    sortOrder === "name-az" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSort("name-az")}
                >
                  Name A~Z
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 ${
                    sortOrder === "name-za" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSort("name-za")}
                >
                  Name Z~A
                </button>
              </li>

              {/* Filter Ukuran */}
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold ">Size </h4>
                <button
                  className="text-color-yellow hover:text-color-gold-card mt-[-7%] mr-2"
                  onClick={handleResetFilters}
                >
                  <box-icon name="reset"></box-icon>
                </button>
              </div>
              <li className="flex gap-2.5 justify-start">
                <button
                  className={`px-4 py-2 text-sm rounded-full border-2 border-color-yellow hover:bg-color-yellow hover:text-black ${
                    selectedSize === "Small"
                      ? "bg-color-yellow text-black"
                      : "text-black"
                  }`}
                  onClick={() => handleSizeChange("Small")}
                >
                  Small
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-full border-2 border-color-yellow hover:bg-color-yellow hover:text-black ${
                    selectedSize === "Medium"
                      ? "bg-color-yellow text-black"
                      : "text-black"
                  }`}
                  onClick={() => handleSizeChange("Medium")}
                >
                  Medium
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-full border-2 border-color-yellow hover:bg-color-yellow hover:text-black ${
                    selectedSize === "Large"
                      ? "bg-color-yellow text-black"
                      : "text-black"
                  }`}
                  onClick={() => handleSizeChange("Large")}
                >
                  Large
                </button>
              </li>

              {/* Filter Kategori */}
              <h4 className="text-lg font-semibold mt-2">Category </h4>
              <li className="flex gap-2.5 justify-start">
                <button
                  className={`px-4 py-2 text-sm rounded-full border-2 border-color-yellow hover:bg-color-yellow hover:text-black ${
                    selectedCategory === "Cafe"
                      ? "bg-color-yellow text-black"
                      : "text-black"
                  }`}
                  onClick={() => handleCategoryChange("Cafe")}
                >
                  Cafe
                </button>
                <button
                  className={`px-4 py-2 text-sm rounded-full border-2 border-color-yellow hover:bg-color-yellow hover:text-black ${
                    selectedCategory === "Restaurant"
                      ? "bg-color-yellow text-black"
                      : "text-black"
                  }`}
                  onClick={() => handleCategoryChange("Restaurant")}
                >
                  Restaurant
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCard;
