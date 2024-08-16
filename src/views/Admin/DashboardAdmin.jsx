import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CardPlace from "../../components/Card/CardPlace";
import TableUser from "../../components/Table/TableUser.jsx";
import AdminList from "../../components/Table/AdminList.jsx";
import axios from "axios";
const DashboardAdmin = () => {
  const [userRole, setUserRole] = useState(null);
  const [totalplace, setTotalPlace] = useState({});
  const [totaluser, setTotalUser] = useState({});
  const [totalguide, setTotalGuide] = useState({});
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
  useEffect(() => {
    const fetchTotalPlace = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/totalplaces", {
          withCredentials: true,
        });
        setTotalPlace(response.data);
      } catch (error) {
        console.error("Error fetching total place", error);
      }
    };

    fetchTotalPlace();
  }, []);
  useEffect(() => {
    const fetchTotalUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/totalusers/User", {
          withCredentials: true,
        });
        setTotalUser(response.data);
      } catch (error) {
        console.error("Error fetching total user", error);
      }
    };

    fetchTotalUser();
  }, []);
  useEffect(() => {
    const fetchTotalGuide = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/totalusers/Guide", {
          withCredentials: true,
        });
        setTotalGuide(response.data);
      } catch (error) {
        console.error("Error fetching total guide", error);
      }
    };

    fetchTotalGuide();
  }, []);
  return (
    <>
    <Navbar />
      <div className="flex justify-center ">
      <CardPlace
          src={"./img/Card/Users.png"}
          title={totaluser.total}
          desc={"Total User"}
        />
      <CardPlace
          src={"./img/Card/guide.png"}
          title={totalguide.total}
          desc={"Total Guide"}
        />
      <CardPlace
          src={"./img/Card/Map.png"}
          title={totalplace.total}
          desc={"Total Place"}
        />
      </div>
      <div className="flex items-center mb-4 mx-[16%]">
        <h1 className="text-2xl kodchasan-bold text-white">User Management</h1>
      </div>
      <div className="container justify-center ml-[5%] flex space-x-1">
        <div className="w-3/5">
          <TableUser/>
          </div>
        <div className="w-1/5">
          <AdminList/>
          </div>
      </div>
    </>
  );
};
export default DashboardAdmin;
