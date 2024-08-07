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
        title={"100"}
        desc={"Tempat yang Populer"}
        />
        <CardPlace 
        src={"./img/Card/approved.png"}
        title={"100"}
        desc={"Tempat yang Populer"}
        />
        </div>
        <TableDashboard/>
        </>
    )
}

export default Dashboard;