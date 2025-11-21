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
   const [attendanceRecords,setAttendanceRecords]=useState([])

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
        setAttendanceRecords(res.data.data)
      })
      .catch((err) => {
        console.error("error fatching selected attendace data", err);
      });
  }, [filterStartDate]);

  // // Sample attendance data
  // const attendanceRecords = [
  //   {
  //     id: 1,
  //     employee: "John Doe",
  //     empId: "EMP001",
  //     department: "Engineering",
  //     date: "2025-01-15",
  //     checkIn: "09:15 AM",
  //     checkOut: "06:30 PM",
  //     status: "Present",
  //     hours: "9.25",
  //   },
  //   {
  //     id: 2,
  //     employee: "Sarah Johnson",
  //     empId: "EMP002",
  //     department: "Marketing",
  //     date: "2025-01-15",
  //     checkIn: "09:00 AM",
  //     checkOut: "06:00 PM",
  //     status: "Present",
  //     hours: "9.00",
  //   },
  //   {
  //     id: 3,
  //     employee: "Mike Chen",
  //     empId: "EMP003",
  //     department: "Engineering",
  //     date: "2025-01-15",
  //     checkIn: "10:30 AM",
  //     checkOut: "07:00 PM",
  //     status: "Late",
  //     hours: "8.50",
  //   },
  //   {
  //     id: 4,
  //     employee: "Lisa Anderson",
  //     empId: "EMP004",
  //     department: "HR",
  //     date: "2025-01-15",
  //     checkIn: "-",
  //     checkOut: "-",
  //     status: "Absent",
  //     hours: "0",
  //   },
  //   {
  //     id: 5,
  //     employee: "David Brown",
  //     empId: "EMP005",
  //     department: "Sales",
  //     date: "2025-01-15",
  //     checkIn: "09:05 AM",
  //     checkOut: "06:15 PM",
  //     status: "Present",
  //     hours: "9.17",
  //   },
  //   {
  //     id: 6,
  //     employee: "Emma Wilson",
  //     empId: "EMP006",
  //     department: "Finance",
  //     date: "2025-01-15",
  //     checkIn: "-",
  //     checkOut: "-",
  //     status: "Leave",
  //     hours: "0",
  //   },
  // ];

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

  console.log(filterStartDate);

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
          {/* Stats Cards
          <div className="attendance-stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="attendance-stat-card">
                <div className="stat-icon-box" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <p className="stat-label">{stat.title}</p>
                  <h3 className="stat-number">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div> */}

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

                {/* 
                <div className="filter-item">
                  <label className="filter-label">To Date</label>
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="date-input-field"
                  />
                </div> */}

                {/* <div className="filter-item">
                  <label className="filter-label">Department</label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="department-select-field"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div> */}

                {/* <div className="filter-item">
                  <label className="filter-label">Search</label>
                  <div className="search-input-wrapper">
                    <FaSearch className="search-icon-input" />
                    <input
                      type="text"
                      placeholder="Search employee..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input-field"
                    />
                  </div>
                </div> */}
              </div>

              {/* <div className="filter-actions">
                  <button className="btn-apply-filter" onClick={handleApplyFilters}>
                    <FaFilter /> Apply Filters
                  </button>
                  <button className="btn-export-report" onClick={handleExportReport}>
                    <FaDownload /> Export Report
                  </button>
                </div> */}
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
                    <tr key={record.employeeId._id}>
                      <td className="emp-id-cell">{record.employeeId._id}</td>
                      <td className="emp-name-cell">{record.employeeName}</td>
                      <td>{record.employeeId.department}</td>
                      <td>{(new Date(`${record.date}`)).toLocaleDateString()}</td>
                      <td className="time-cell">{record.checkIn}</td>
                      <td className="time-cell">{record.checkOut}</td>
                      <td className="hours-cell">{record.totalHours}hrs</td>
                      <td>
                        <span
                          className={`status-badge-attendance ${record.status.toLowerCase()}`}
                        >
                          {record.status}
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
