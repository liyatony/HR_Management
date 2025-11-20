import React, { useState } from "react";
import { useNavigate, useLocation, useParams, Await } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
  FaBriefcase,
  FaIdCard,
  FaMoneyBillWave,
  FaBirthdayCake,
  FaEdit,
  FaTrash,
  FaPersonBooth,
  FaImage,
} from "react-icons/fa";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import "../../styles/dashboard.css";
import "../../styles/employeeprofile.css";
import { Avatar } from "@mui/material";
import axios, { Axios } from "axios";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  // Get employee data from navigation state
  const [employee, setEmployee] = useState(
    location.state?.employee || {
      id: "id",
      name: "Employee Name",
      department: "Department",
      position: "Position",
      email: "email@company.com",
      phone: "+91 00000 00000",
      joiningDate: "2024-01-01",
      status: "status",
      salary: "Not specified",
    }
  );

  const [formData, setFormData] = useState(employee);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlefileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedFormdata = new FormData();
      updatedFormdata.append("name", formData.name);
      updatedFormdata.append("email", formData.email);
      updatedFormdata.append("phone", formData.phone);
      updatedFormdata.append("department", formData.department);
      updatedFormdata.append("position", formData.position);
      updatedFormdata.append("dateOfJoining", formData.dateOfJoining);
      updatedFormdata.append("salary", formData.salary);
      updatedFormdata.append("role", formData.role);

      if (file) {
        updatedFormdata.append("image", file);
      }

      // for (let [key, value] of updatedFormdata.entries()) {
      //   console.log(key, value);
      // }

      await axios
        .put(
          `http://localhost:4300/emp/update/${formData._id}`,
          updatedFormdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setFormData(res.data.data);
          setEmployee(res.data.data);
          setIsEditing(false); // move inside .then()
          alert("Employee details updated successfully!"); // move inside .then()
        })
        .catch((error) => {
          console.error("Failed to update employee:", error);
          alert("Failed to update employee. Please try again.");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setFormData(employee);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this employee? This action cannot be undone."
      )
    ) {try {
     await  axios.delete(`http://localhost:4300/emp/delete/${employee._id}`)
     alert("Employee deleted successfully!");
     
      
    } catch (error) {
      console.error("failed to delete employee",error)
      
    }
      
      navigate("/employees");
      
    }
  };

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-wrapper">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="Employee Profile"
          pageSubtitle="View and manage employee details"
        />

        <main className="content-area">
          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/employees")}>
            <FaArrowLeft /> Back to Employees
          </button>

          {/* Profile Header Card */}
          <div className="profile-header-card">
            <div className="profile-header-content">
              <div className="profile-avatar-large">
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 90, height: 90 }}
                  src={`http://localhost:4300/${employee.image}`}
                />
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name">{employee.name}</h2>
                <p className="profile-position">{employee.position}</p>
                <div className="profile-badges">
                  <span className="badge-dept">{employee.department}</span>
                  <span
                    className={`badge-status ${
                      employee.status ? "active" : "inactive"
                    }`}
                  >
                    {employee.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-edit-profile"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
              <button className="btn-delete-profile" onClick={handleDelete}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>

          {/* Edit Form or Profile Details */}
          {isEditing ? (
            /* Edit Form */
            <div className="edit-form-container">
              <div className="profile-section">
                <h3 className="section-title">Edit Employee Information</h3>

                <div className="edit-form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <FaEnvelope /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaPhone /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 00000 00000"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaBriefcase /> Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select department</option>
                      <option value="IT">IT</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaBriefcase /> Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaCalendar /> Date of Joining
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={new Date(formData.dateOfJoining)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaImage /> Profile picture
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handlefileChange}
                      className="form-input"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <FaIdCard />
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select Role</option>
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                      <option value="dpt_head">Dpt.Head</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaMoneyBillWave /> Monthly Salary (₹) *
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="₹50,000"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn-cancel" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="btn-save" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Profile Details Grid */
            <div className="profile-grid">
              {/* Personal Information */}
              <div className="profile-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">
                      <FaIdCard />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Employee ID</span>
                      <span className="info-value">{employee._id}</span>
                    </div>
                  </div>

                  {/* <div className="info-item">
                    <div className="info-icon">
                      <FaBirthdayCake />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Date of Joining</span>
                      <span className="info-value">
                        {new Date(employee.dateOfJoining).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                  </div> */}

                  <div className="info-item">
                    <div className="info-icon">
                      <FaEnvelope />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Email</span>
                      <span className="info-value">{employee.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaCalendar />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Joining Date</span>
                      <span className="info-value">
                        {" "}
                        {new Date(employee.dateOfJoining).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaPhone />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{employee.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="profile-section">
                <h3 className="section-title">Employment Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">
                      <FaBriefcase />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Department</span>
                      <span className="info-value">{employee.department}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaBriefcase />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Position</span>
                      <span className="info-value">{employee.position}</span>
                    </div>
                  </div>

                  {/* <div className="info-item">
                    <div className="info-icon">
                      <FaCalendar />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Joining Date</span>
                      <span className="info-value">
                        {" "}
                        {new Date(employee.dateOfJoining).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                  </div> */}

                  <div className="info-item">
                    <div className="info-icon">
                      <FaMoneyBillWave />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Salary</span>
                      <span className="info-value">
                        <span>&#8377;</span>
                        {employee.salary}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaIdCard />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Employment Status</span>
                      <span className="info-value">
                        {employee.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;
