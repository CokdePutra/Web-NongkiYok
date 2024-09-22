import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';

const HomeCard = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [cards, setCards] = useState([]);
  const [sortOrder, setSortOrder] = useState('up');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State untuk membuka/tutup filter popup

  // Fetch cards berdasarkan sortOrder
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${baseURL}/card/${sortOrder}`);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [sortOrder, baseURL]);

  const handleSort = (order) => {
    setSortOrder(order); // Set the new sortOrder
    setIsFilterOpen(false); // Close the filter popup after selecting an option
  };

  return (
    <>
      <Navbar />
      <div className="container-card flex flex-wrap justify-center items-stretch gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            placeId={card.Id_Places}
            key={index}
            title={card.Name}
            imgSrc={card.Image ? `./${card.Image}` : './img/Card/image-ex.png'}
            description={card.Description}
            link={card.Link}
            price={card.AVG_Price}
            category={card.Category}
            size={card.Size}
          />
        ))}
      </div>
      <div className="mt-2 ml-3 mb-4 fixed bottom-3 left-0">
        <img
          src="./img/Card/Tune.png"
          alt="Filter"
          className="w-[67%] h-[auto] cursor-pointer"
          onClick={() => setIsFilterOpen(true)} // Buka popup ketika tombol filter diklik
        />
      </div>

      {/* Popup untuk filter */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-md relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-4">Urutkan Berdasarkan</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold mt-[-7%]"
                onClick={() => setIsFilterOpen(false)}
              >
                &times;
              </button>
            </div>
            <hr className="my-1 mb-3 border-t border-gray-300" />
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg flex items-center hover:bg-gray-100 ${
                    sortOrder === 'down' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSort('down')}
                >
                  {/* <img src="./img/icons/dolardown.png" alt="Harga Terendah" className="w-5 h-5 mr-2" /> */}
                  Harga Terendah
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg flex items-center hover:bg-gray-100 ${
                    sortOrder === 'up' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSort('up')}
                >
                  {/* <img src="./img/icons/dolardown.png" alt="Harga Tertinggi" className="w-5 h-5 mr-2" /> */}
                  Harga Tertinggi
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 ${
                    sortOrder === 'name-az' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSort('name-az')}
                >
                  Nama A-Z
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 ${
                    sortOrder === 'name-za' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSort('name-za')}
                >
                  Nama Z-A
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
