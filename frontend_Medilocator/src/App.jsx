import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Layouts and Protection ---
import Layout from "./layout";
import ProtectedRoute from "./components/ProtectedRoute"; 

// --- Public Pages ---
import Detail from "./components/Detail";
import Signup from "./components/Signup";
import Login from "./components/login";
import MedicineDetails from "./components/medicineDetails";
import CatalogDisplay from "./components/CatalogDisplay";

// --- Store Auth ---
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/adminLogin";

// --- Protected Store Pages ---
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import StoreDashboard from "./components/StoreDashboard";
import SearchCatalog from "./components/SearchCatalog";
import AddProductCatalog from "./components/AddProductCatalog";
import AddStock from "./components/AddStock";
import UpdateInventoryPage from "./components/UpdateInventoryPage"; // <-- 1. IMPORT THE NEW PAGE

function App() {
  return (
    <Router>
      <Routes>
        
        {/* === 1. PUBLIC ROUTES === */}
        <Route element={<Layout />}>
          <Route path="/" element={<Detail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medicineDetails" element={<MedicineDetails />} />
          <Route path="/catalog" element={<CatalogDisplay />} />
        </Route>

        {/* === 2. STORE AUTH ROUTES === */}
        <Route path="/admin/register" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* === 3. PROTECTED STORE ROUTES === */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/catalog" element={<ProductCatalog />} />
          <Route path="/store" element={<StoreDashboard />} />
          <Route path="/store/search" element={<SearchCatalog />} />
          <Route path="/search/add" element={<AddProductCatalog />} />
          <Route path="/search" element={<SearchCatalog />} />
          <Route path="/store/add-stock/:medicineId" element={<AddStock />} />
          
          {/* 2. ADD THE NEW ROUTE FOR THE EDIT PAGE */}
          <Route path="/store/inventory/edit/:inventoryId" element={<UpdateInventoryPage />} />
          
          {/* Redirects */}
          <Route path="/adminDashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/store/inventory" element={<Navigate to="/store" replace />} />

        </Route>

        {/* === 4. FALLBACK ROUTE === */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;