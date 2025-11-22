import React, { useState } from "react";
import { markAttendanceAPI } from "../../api/attendanceApi";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiClock,
  FiClipboard,
  FiFileText,
  FiDownload,
  FiLogOut,
} from "react-icons/fi";
import "../../styles/dashboard.css";
import "../../styles/attendance.css";

const MarkAttendance = () => {
  const navigate = useNavigate();
  const empId = localStorage.getItem("employeeId");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleMark = async () => {
    if (!empId) return setMsg("Employee ID missing");

    setLoading(true);
    try {
      await markAttendanceAPI(empId);
      setMsg("✔ Attendance marked successfully");
    } catch (err) {
      if (err?.response?.status === 409)
        setMsg("You already marked attendance today");
      else setMsg("Error marking attendance");
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-wrapper">

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="sidebar open">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">HR</div>
            <h2 className="logo-text">HR System</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => navigate("/employee/dashboard")}>
            <FiHome className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </div>

          <div className="nav-item" onClick={() => navigate("/employee/profile")}>
            <FiUser className="nav-icon" />
            <span className="nav-label">View Profile</span>
          </div>

          <div className="nav-item active">
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
            <span className="nav-label">Download Payslip</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item logout" onClick={() => navigate("/")}>
            <FiLogOut className="nav-icon" />
            <span className="nav-label">Logout</span>
          </div>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="navbar-left">
            <h1>Mark Attendance</h1>
            <p className="page-subtitle">Record your attendance</p>
          </div>
        </header>

        <main className="content-area">
          <div className="attendance-card">
            <h2>Mark Attendance</h2>

            <button
              className="dash-btn"
              disabled={loading}
              onClick={handleMark}
            >
              {loading ? "Marking..." : "Mark Now"}
            </button>

            {msg && (
              <p className={`status-text ${msg.includes("✔") ? "success" : "error"}`}>
                {msg}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAttendance;
