import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function AdminLogin() {
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
    setError("");
    try {
      const res = await api.post("/stores/login", formData);
      const { accessToken, refreshToken, store } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("store", JSON.stringify(store));

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "360px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: "600" }}>
          Store Login
        </h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: "500" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: "500" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                fontSize: "15px",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
            style={{
              fontSize: "16px",
              fontWeight: "600",
              padding: "10px 0",
              borderRadius: "8px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <h6
            className="mt-3 text-center"
            style={{ fontSize: "13px", color: "#555" }}
          >
            Not registered yet?{" "}
            <span
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/admin/register")}
            >
              Signup now
            </span>
          </h6>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
