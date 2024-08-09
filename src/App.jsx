import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Data from "./views/Data";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import HomeCard from "./views/HomeCard";
import SessionInfo from "./views/SessionInfo";
import MapComponent from "./views/MapComponent";
import Dashboard from "./views/Dashboard";
import LocationInput from "./views/LocationInput";
import EditLocation from "./views/EditLocation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/homecard" element={<HomeCard />} />
          <Route path="/ss" element={<SessionInfo />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/LocationInput" element={<LocationInput />} />
          <Route path="/EditLocation/:id" element={<EditLocation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
