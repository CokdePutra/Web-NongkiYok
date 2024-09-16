import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';

const HomeCard = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [cards, setCards] = useState([]);
  const [sortOrder, setSortOrder] = useState('up'); 

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

  const handleSortUp = () => {
    setSortOrder('up');
  };
  
  const handleSortDown = () => {
    setSortOrder('down');
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
      <div className="mt-2 ml-3 mb-4 fixed bottom-0 left-0">
        {sortOrder === 'up' ? (
          <img
            src="./img/Card/Up.png"
            alt="Sort Up"
            className="w-[90%] h-[auto] cursor-pointer"
            onClick={handleSortDown}
          />
        ) : (
          <img
            src="./img/Card/DOWN.png"
            alt="Sort Down"
            className="w-[90%] h-[auto] cursor-pointer"
            onClick={handleSortUp}
          />
        )}
      </div>
    </>
  );
};

export default HomeCard;
