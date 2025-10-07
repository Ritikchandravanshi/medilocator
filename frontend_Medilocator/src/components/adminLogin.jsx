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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/stores/login", formData); // Admin login API
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("store", JSON.stringify(res.data.store));

      setSuccess("Login successful!");
      setError("");

      setTimeout(() => {
        navigate("/adminDashboard"); // Redirect to admin dashboard
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <h6 style={{ fontSize: "10px" }} className="mt-2">
            Not registered yet?{" "}
            <span
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/admin")}
            >
              Signup now
            </span>
          </h6>
        </form>
      </div>
    </div>
  );
}
