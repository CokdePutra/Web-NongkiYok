import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';

const HomeCard = () => {
  const [cards, setCards] = useState([]);
  const [sortOrder, setSortOrder] = useState('up'); // Default sort order
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/card/${sortOrder}`);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [sortOrder]);

  return (
    <>
      <Navbar />
      <div className="container-card flex flex-wrap justify-center items-stretch gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.Name} 
            imgSrc="./img/Card/image-ex.png" 
            description={card.Description} 
            link={card.Link}
            price={card.AVG_Price} 
            category={card.Category}
          />
        ))}
      </div>
    </>
  );
};

export default HomeCard;
