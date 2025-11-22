import React, { useEffect, useState } from "react";
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
import { getAttendanceHistoryAPI } from "../../api/attendanceApi";

const AttendanceHistory = () => {
  const navigate = useNavigate();
  const empId = localStorage.getItem("employeeId");

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAttendanceHistoryAPI(empId);
        setRecords(res.data || []);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, []);

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

          <div className="nav-item" onClick={() => navigate("/mark-attendance")}>
            <FiClock className="nav-icon" />
            <span className="nav-label">Mark Attendance</span>
          </div>

          <div className="nav-item active">
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
            <h1>Attendance History</h1>
            <p className="page-subtitle">View your daily attendance</p>
          </div>
        </header>

        <main className="content-area">
          <div className="attendance-card">

            <h2>Your Attendance</h2>

            {loading ? (
              <p>Loading...</p>
            ) : records.length === 0 ? (
              <p>No attendance records found.</p>
            ) : (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td>{new Date(r.date).toLocaleDateString()}</td>
                      <td>{r.checkIn || "-"}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceHistory;
