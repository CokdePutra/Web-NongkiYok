import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CardPlace from "../../components/Card/CardPlace";
import TableUser from "../../components/Table/TableUser";
import AdminList from "../../components/Table/AdminList";
import GuideRegister from "../../components/Table/GuideRegister";
import axios from "axios";

const DashboardAdmin = () => {
  const [userRole, setUserRole] = useState(null);
  const [totalPlace, setTotalPlace] = useState({});
  const [totalUser, setTotalUser] = useState({});
  const [allUser, setallUser] = useState({});
  const [totalGuide, setTotalGuide] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);
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
    const fetchallUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all/users", {
          withCredentials: true,
        });
        setallUser(response.data);
      } catch (error) {
        console.error("Error fetching total user", error);
      }
    };

    fetchallUser();
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
      <div className="flex justify-center">
      <div className="grid grid-cols-1 justify-items-center">
        <CardPlace
          src={"./img/Card/Users.png"}
          title={totalUser.total}
          desc={"Total User"}
        />
        <CardPlace
          src={"./img/Card/guide.png"}
          title={totalGuide.total}
          desc={"Total Guide"}
        />
      </div>
      <div className="grid grid-cols-1 justify-items-center">
        <CardPlace
          src={"./img/Card/Person.png"}
          title={allUser.total}
          desc={"All Users"}
        />
        <CardPlace
          src={"./img/Card/Map.png"}
          title={totalPlace.total}
          desc={"Total Place"}
        />
        </div>
        </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-1 w-11/12 max-w-screen-xl">
          <div className="w-9/12">
            <TableUser />
          </div>
          <div className="w-3/12">
            <AdminList />
          </div>
        </div>
        <div className="w-11/12 max-w-screen-xl mt-2">
          <GuideRegister />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
