import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
//views
import Home from "./views/Home";
import Contact from "./views/Contact";
//credential
import Login from "./views/Credential/Login";
import SignUp from "./views/Credential/SignUp";
import VerifyEmail from "./views/Credential/VerifyEmail";
import Resetpw from "./views/Credential/Resetpw";
import VerifyOTP from "./views/Credential/VerifyOTP";
//dashboard
import DashboardAdmin from "./views/Dashboard/DashboardAdmin";
import ContactList from "./views/Dashboard/ContactList";
import ReportList from "./views/Dashboard/ReportList";
import Dashboard from "./views/Dashboard/Dashboard";
import GuideRequest from "./views/Dashboard/GuideRequest";
//Location
import LocationInput from "./views/Location/LocationInput";
import EditLocation from "./views/Location/EditLocation";
import HomeCard from "./views/Location/HomeCard";
import MapComponent from "./views/Location/MapComponent";
import DetailLocation from "./views/Location/DetailLocation";
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
          <Route path="/verify-email/:email" element={<VerifyEmail />} />
          <Route path="/reset-pw" element={<Resetpw />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
          <Route path="/DetailLocation/:id" element={<DetailLocation />} />
          <Route path="/Report" element={<ReportList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
