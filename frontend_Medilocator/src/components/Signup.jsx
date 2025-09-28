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
  console.log("Signup Data:", formData);

  try {
    const res = await axios.post(
      "/api/v1/users/register", // backend API URL
      formData,
      { withCredentials: true } // cookies/credentials ke liye
    );
    console.log("Response:", res.data);
    alert(res.data.message || "Signup successful!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Signup failed");
  }
};


  return (
    <section className="vh-40">
      <div className="container py-1 h-70">
        <div className="row d-flex justify-content-center align-items-center h-70">
          <div className="col-12 col-md-6 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center position-relative">
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  aria-label="Close"
                  onClick={() => navigate("/")}
                ></button>
                <h2 className="mb-2">Sign Up</h2>
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border rounded text-start"
                >
                  <div className="mb-2">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                    <label className="form-label">Contact No</label>
                    <input
                      type="text"
                      name="contactNo"
                      className="form-control"
                      value={formData.contactNo}
                      onChange={handleChange}
                      maxLength={10}
                      minLength={10}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
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
                  <button type="submit" className="btn btn-success w-10">
                    Sign Up
                  </button>
                </form>
                <hr className="my-2" />
                {/* Extra content below signup form */}
                <button
                  className="btn btn-sm btn-block btn-primary mb-2"
                  style={{ backgroundColor: "#dd4b39" }}
                >
                  <i className="fab fa-google me-2"></i> Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
