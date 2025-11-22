import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiClock,
  FiClipboard,
  FiFileText,
  FiDownload,
  FiLogOut,
  FiMenu
} from "react-icons/fi";
import "../../styles/dashboard.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

 
  localStorage.setItem("employeeId", "691482fd9bba030d9b1bc51c");

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">HR</div>
            <h2 className="logo-text">HR System</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active" onClick={() => navigate("/employee/dashboard")}>
            <FiHome className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/employee/profile")}>
            <FiUser className="nav-icon" />
            <span className="nav-label">View Profile</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/mark-attendance")}>
            <FiClock className="nav-icon" />
            <span className="nav-label">Mark Attendance</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/attendance-history")}>
            <FiClipboard className="nav-icon" />
            <span className="nav-label">Attendance History</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/apply-leave")}>
            <FiFileText className="nav-icon" />
            <span className="nav-label">Apply Leave</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/payslips")}>
            <FiDownload className="nav-icon" />
            <span className="nav-label">Download Paysl222ip</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item logout" onClick={() => navigate("/")}>
            <FiLogOut className="nav-icon" />
            <span className="nav-label">Logout</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={toggleSidebar}>
              <FiMenu />
            </button>

            <div className="page-title">
              <h1>Employee Dashboard</h1>
              <p className="page-subtitle">Welcome back</p>
            </div>
          </div>

          <div className="navbar-right">
            <div className="user-profile">
              <img
                src="https://ui-avatars.com/api/?name=Employee&background=4f46e5&color=fff"
                className="profile-img"
                alt="profile"
              />
              <div className="profile-info">
                <span className="profile-name">Employee</span>
                <span className="profile-role">Employee</span>
              </div>
            </div>
          </div>
        </header>

        {/* --- QUICK ACTION BUTTONS --- */}
        <div className="quick-buttons">
          <button
            className="quick-btn"
            onClick={() => navigate("/mark-attendance")}
          >
            Mark Attendance
          </button>

          <button
            className="quick-btn"
            onClick={() => navigate("/attendance-history")}
          >
            View Attendance History
          </button>
        </div>

        {/* --- STATS SECTION --- */}
        <main className="content-area">
          <div className="stats-grid">

            <div className="stat-card">
              <h3>Total Employees</h3>
              <p className="stat-value">124</p>
            </div>

            <div className="stat-card">
              <h3>Attendance Rate</h3>
              <p className="stat-value">98%</p>
            </div>

            <div className="stat-card">
              <h3>Payslip Status</h3>
              <p className="stat-value">Available</p>
            </div>

            <div className="stat-card">
              <h3>Performance Score</h3>
              <p className="stat-value">87%</p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
