import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/users/login", formData);

      console.log("Login success:", res.data);

      // Store tokens in localStorage
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Login successful!");
      setError("");

      // Redirect or update UI after login
      setTimeout(() => {
        window.location.href = "/adminDashboard";
      }, 1000);
    } catch (err) {
      console.error(err);

      setError(
        err.response && err.response.data
          ? err.response.data.message
          : "Invalid email or password"
      );
      setSuccess("");
    }
  };
 const  navigate = useNavigate();
  return (
   
    <div style={{fontSize : "9px"}} className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <h3 className="text-center mb-3">Admin Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <h3 style={{ fontSize: "10px" }}>
            Not signup please ?{" "}
            <span
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/adminDashboard")}
            >
              signup now
            </span>
          </h3>
        </form>
      </div>
      
    </div>
  );
}
