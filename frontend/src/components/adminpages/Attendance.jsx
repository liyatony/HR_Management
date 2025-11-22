

import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import axios from "axios";
import {
  FaCalendarCheck,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaFilter,
  FaDownload,
} from "react-icons/fa";
import "../../styles/attendance.css";

const Attendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("attendance");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("2025-01-01");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

  useEffect(() => {
    if (!filterStartDate) return;

    axios
      .get("http://localhost:4300/emp/attendance_records", {
        params: { date: filterStartDate },
      })
      .then((res) => {
        console.log(res.data.data);
        setAttendanceRecords(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching selected attendance data", err);
      });
  }, [filterStartDate]);

  const statsData = [
    {
      title: "Total Present",
      value: "98",
      icon: <FaUserCheck />,
      color: "#16a34a",
      bgColor: "#dcfce7",
    },
    {
      title: "Total Absent",
      value: "8",
      icon: <FaUserTimes />,
      color: "#dc2626",
      bgColor: "#fee2e2",
    },
    {
      title: "On Leave",
      value: "12",
      icon: <FaCalendarAlt />,
      color: "#ea580c",
      bgColor: "#ffedd5",
    },
    {
      title: "Late Arrivals",
      value: "6",
      icon: <FaClock />,
      color: "#d97706",
      bgColor: "#fef3c7",
    },
  ];

  const handleExportReport = () => {
    console.log("Exporting attendance report...");
    console.log("Date Range:", filterStartDate, "to", filterEndDate);
    console.log("Department:", filterDepartment || "All");
    // Add your export logic here
  };

  const handleApplyFilters = () => {
    console.log("Applying filters...");
    console.log("Start Date:", filterStartDate);
    console.log("End Date:", filterEndDate);
    console.log("Department:", filterDepartment);
    // Add your filter logic here
  };

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="main-wrapper">
        <Navbar
          toggleSidebar={toggleSidebar}
          pageTitle="Attendance Management"
          pageSubtitle="Track and manage employee attendance"
        />

        <main className="content-area">
          {/* Filters Section */}
          <div className="attendance-filters-card">
            <div className="filters-header">
              <h3 className="filters-title">
                <FaFilter /> Filter Attendance Records
              </h3>
            </div>

            <div className="filters-container">
              <div className="filter-row">
                <div className="filter-item">
                  <label className="filter-label">Select A Date</label>
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="date-input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="attendance-table-card">
            <div className="table-header">
              <h3 className="table-title">
                <FaCalendarCheck /> Attendance Records
              </h3>
              <span className="record-count">
                {attendanceRecords.length} Records
              </span>
            </div>

            <div className="table-wrapper">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr
                      key={
                        record.employeeId?._id || record._id || Math.random()
                      }
                    >
                      <td className="emp-id-cell">
                        {record.employeeId?._id || "N/A"}
                      </td>
                      <td className="emp-name-cell">
                        {record.employeeName || "N/A"}
                      </td>
                      <td>{record.employeeId?.department || "-"}</td>
                      <td>
                        {record.date
                          ? new Date(record.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="time-cell">{record.checkIn || "-"}</td>
                      <td className="time-cell">{record.checkOut || "-"}</td>
                      <td className="hours-cell">
                        {record.totalHours ? `${record.totalHours}hrs` : "-"}
                      </td>
                      <td>
                        <span
                          className={`status-badge-attendance ${
                            record.status?.toLowerCase() || "unknown"
                          }`}
                        >
                          {record.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
