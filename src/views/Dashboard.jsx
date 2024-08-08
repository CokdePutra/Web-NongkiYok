import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import CardPlace from "../components/Card/CardPlace";
import TableDashboard from "../components/Table/TableDashboard.jsx";
import axios from "axios";

const Dashboard = () => {
    const [Total, setTotal] = useState([]);
    const [favorites, setfavorites] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/session", {
                    withCredentials: true,
                });
                const role = response.data.role;
                setUserRole(role);

                // Redirect if not Guide or Admin
                if (role !== "Guide" && role !== "Admin") {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
                navigate("/");
            }
        };

        checkLoginStatus();
    });

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/AllPlaces", {
                    withCredentials: true,
                });
                setTotal(response.data);
            } catch (error) {
                console.error("Error fetching Total places", error);
            }
        };
        fetchTotal();
    }, []);

    useEffect(() => {
        const fetchfavorites = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/FavPlaces", {
                    withCredentials: true,
                });
                setfavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites places", error);
            }
        };
        fetchfavorites();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <CardPlace
                    src={"./img/Card/star.png"}
                    title={favorites.total_favorites}
                    desc={"Bintang diperoleh"}
                />
                <CardPlace
                    src={"./img/Card/placeholder.png"}
                    title={Total.total}
                    desc={"Tempat yang ditambahkan"}
                />
            </div>
            <TableDashboard />
        </>
    )
}

export default Dashboard;