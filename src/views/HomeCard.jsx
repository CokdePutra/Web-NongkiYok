import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";

const HomeCard = () => {
  return (
    <>
      <Navbar />
      <div className="container-card flex flex-wrap justify-center items-stretch gap-4 p-4">
        <Card
          title="Sendiri Coffee Bar"
          imgSrc="./img/Card/image-ex.png"
          description="ini description"
        />
        <Card
          title="Another Coffee Place"
          imgSrc="./img/Card/image-ex.png"
          description="description for another place"
        />
        <Card
          title="Yet Another Coffee Spot"
          imgSrc="./img/Card/image-ex.png"
          description="description for yet another spot"
        />
        <Card
          title="Yet Another Coffee Spot"
          imgSrc="./img/Card/image-ex.png"
          description="description for yet another spot"
        />
        <Card
          title="Yet Another Coffee Spot"
          imgSrc="./img/Card/image-ex.png"
          description="description for yet another spot"
        />
      </div>
    </>
  );
};

export default HomeCard;
