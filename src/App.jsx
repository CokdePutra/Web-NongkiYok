import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/Activities" element={<Activities />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
