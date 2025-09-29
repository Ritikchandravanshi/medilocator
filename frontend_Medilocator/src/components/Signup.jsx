import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    gender: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/v1/users/register",
        formData,
        { withCredentials: true }
      );
      alert(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="signup-section">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="card shadow signup-card">
          <div className="card-body p-4 position-relative">
            {/* Close button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-2"
              aria-label="Close"
              onClick={() => navigate("/")}
            ></button>

            <h2 className="text-center mb-3">Sign Up</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control mb-2"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-2"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="contactNo"
                placeholder="Contact No"
                className="form-control mb-2"
                value={formData.contactNo}
                onChange={handleChange}
                maxLength={10}
                minLength={10}
                required
              />

              <select
                name="gender"
                className="form-select mb-2"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn btn-success w-100">
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3" style={{ fontSize: "12px" }}>
              Already registered?{" "}
              <span
                style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/login")}
              >
                Login now
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .signup-section {
          background: #f8f9fa;
        }
          
        .signup-card {
          max-width: 350px;
          width: 100%;
          border-radius: 1rem;
          padding: 15px;
            font-size: 8px;
        }

.signup-card label,
.signup-card input,
.signup-card select,
.signup-card button {
  font-size: 8px; 
}

      `}</style>
    </section>
  );
}

