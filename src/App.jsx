import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import HomeCard from "./views/HomeCard";
import MapComponent from "./views/MapComponent";
import Dashboard from "./views/Dashboard";
import LocationInput from "./views/LocationInput";
import EditLocation from "./views/EditLocation";
import Contact from "./views/Contact";
import DashboardAdmin from "./views/Admin/DashboardAdmin";
import ContactList from "./views/Admin/ContactList";
import GuideRequest from "./views/GuideRequest";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/homecard" element={<HomeCard />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/LocationInput" element={<LocationInput />} />
          <Route path="/EditLocation/:id" element={<EditLocation />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Admin" element={<DashboardAdmin />} />
          <Route path="/ListContact" element={<ContactList />} />
          <Route path="/GuideRequest" element={<GuideRequest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
