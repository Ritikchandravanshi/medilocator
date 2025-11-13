import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AdminSidebar from "./AdminSidebar"; // Import the sidebar

const AddProductCatalog = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "medicine",
    dosageForm: "",
    packSize: "",
    description: "",
    genericName: "",
    manufacturer: "",
    requiresPrescription: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // This hits the POST /api/v1/catalog/ route we just made
      await api.post("/catalog", formData); 
      setSuccess("Product added to master catalog successfully!");
      setTimeout(() => navigate("/admin/master-catalog"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100">
      <AdminSidebar />
      <div className="flex-grow-1 p-4 vh-100" style={{ overflow: 'auto', backgroundColor: '#f8f9fa' }}>
        <h1 className="display-5">Add New Product to Master Catalog</h1>
        <p className="lead">This product will be available for all stores to add.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit} className="card p-4 mt-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" onChange={handleChange} required className="form-control form-control-lg" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Brand</label>
              <input type="text" name="brand" onChange={handleChange} required className="form-control form-control-lg" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-select form-select-lg">
                <option value="medicine">Medicine</option>
                <option value="equipment">Equipment</option>
                <option value="supplement">Supplement</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Generic Name</label>
              <input type="text" name="genericName" onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Dosage Form (e.g., Tablet, Syrup)</label>
              <input type="text" name="dosageForm" onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Pack Size (e.g., 15 Tablets)</label>
              <input type="text" name="packSize" onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="col-12">
              <label className="form-label">Manufacturer</label>
              <input type="text" name="manufacturer" onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea name="description" onChange={handleChange} className="form-control form-control-lg"></textarea>
            </div>
            <div className="col-12">
              <div className="form-check form-switch fs-5">
                <input 
                  type="checkbox" 
                  name="requiresPrescription" 
                  checked={formData.requiresPrescription} 
                  onChange={handleChange} 
                  className="form-check-input"
                  id="reqPrescription"
                />
                <label className="form-check-label" htmlFor="reqPrescription">Requires Prescription</label>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-end gap-2">
            <button 
              type="button" 
              className="btn btn-lg btn-secondary" 
              onClick={() => navigate("/admin/master-catalog")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductCatalog;