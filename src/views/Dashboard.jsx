import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CardPlace from "../components/Card/CardPlace";
import TableDashboard from "../components/Table/TableDashboard.jsx";
const Dashboard = () => {
    return (
        <>
        <Navbar />
        <div className="flex justify-center">
        <CardPlace 
        src={"./img/Card/heart.png"}
        title={"1"}
        desc={"Tempat yang Populer"}
        />
        <CardPlace 
        src={"./img/Card/placeholder.png"}
        title={"3"}
        desc={"Tempat yang ditambahkan"}
        />
        </div>
        <TableDashboard/>
        </>
    )
}

export default Dashboard;