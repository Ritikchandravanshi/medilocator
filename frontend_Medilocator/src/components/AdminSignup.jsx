import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    address: "",
    email: "",
    contactNo: "",
    licenseNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/stores/register", formData);
      setMessage(res.data.message || "Store registered successfully!");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: "600" }}>
          Store Signup
        </h3>

        {message && (
          <div
            className={`alert ${
              message.includes("successfully")
                ? "alert-success"
                : "alert-danger"
            } py-2`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="storeName"
              placeholder="Store Name"
              value={formData.storeName}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="contactNo"
              placeholder="Contact Number"
              value={formData.contactNo}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <button
            className="btn btn-primary w-100 mt-2"
            type="submit"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              padding: "10px 0",
              borderRadius: "8px",
            }}
          >
            Sign Up
          </button>
        </form>

        <p
          className="text-center mt-3"
          style={{ fontSize: "13px", color: "#555" }}
        >
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/admin/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
