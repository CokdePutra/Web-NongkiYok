import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Data from "./views/Data"
import Home from "./views/Home"
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
