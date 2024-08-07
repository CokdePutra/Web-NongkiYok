import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CardPlace from "../components/Card/CardPlace";

const Dashboard = () => {
    return (
        <>
        <Navbar />
        <div className="flex justify-center">
        <CardPlace 
        src={"./img/Card/heart.png"}
        title={"100"}
        desc={"Tempat yang Populer"}
        />
        <CardPlace 
        src={"./img/Card/approved.png"}
        title={"100"}
        desc={"Tempat yang Populer"}
        />
        </div>
        </>
    )
}

export default Dashboard;