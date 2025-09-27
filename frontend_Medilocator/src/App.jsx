import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <div className="detail">
          <Routes>
            <Route path="/" element={<Detail />} />
            <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
