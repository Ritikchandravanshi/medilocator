import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import Login from "./components/login";
import MedicineDetails from "./components/medicineDetails";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import StoreDashboard from "./components/StoreDashboard";
import SearchCatalog from "./components/SearchCatalog";
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/adminLogin";
import AddProductCatalog from "./components/AddProductCatalog";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar + Footer */}
        <Route
          element={<Layout />}
        >
          <Route path="/" element={<Detail />} />
           <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
             <Route path="/medicineDetails" element={<MedicineDetails />} />
        </Route>

        {/* Routes without Navbar + Footer */}
   
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/catalog" element={<ProductCatalog />} />
          <Route path="/store" element={<StoreDashboard />} />
          <Route path="/store/search" element={<SearchCatalog />} />
          <Route path="/search/add" element={<AddProductCatalog />} />
      </Routes>
    </Router>
  );
}

export default App;
