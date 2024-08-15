import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CardPlace from "../../components/Card/CardPlace";
import axios from "axios";
const DashboardAdmin = () => {
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
        // Redirect if not Guide, Admin, or User
        if (role !== "Admin") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);
  return (
    <>
    <Navbar />
      <div className="flex justify-center">
      <CardPlace
          src={"./img/Card/star.png"}
          title={1}
          desc={"Total User"}
        />
      <CardPlace
          src={"./img/Card/guide.png"}
          title={1}
          desc={"Total Guide"}
        />
      <CardPlace
          src={"./img/Card/location.png"}
          title={1}
          desc={"Total Place"}
        />
      </div>
    </>
  );
};
export default DashboardAdmin;
