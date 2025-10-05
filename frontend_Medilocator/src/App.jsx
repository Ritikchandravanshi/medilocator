import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import MedicineDetails from "./components/medicineDetails";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import StoreDashboard from "./components/StoreDashboard";


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
             <Route path="/medicineDetails" element={<MedicineDetails/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/catalog" element={<ProductCatalog />} />
            <Route path="/store" element={<StoreDashboard/>}/>
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
