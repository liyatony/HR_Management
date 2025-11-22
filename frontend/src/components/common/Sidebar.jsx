// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaTachometerAlt, 
  FaClipboardList, 
  FaCog, 
  FaSignOutAlt, 
  FaTimes 
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { id: "employees", label: "Employees", icon: <FaUsers />, path: "/employees" },
    { id: "attendance", label: "Attendance", icon: <FaCalendarCheck />, path: "/admin/attendance" },
    { id: "leaves", label: "Leave Management", icon: <FaClipboardList />, path: "/admin/leave-management" },
    { id: "payroll", label: "Payroll", icon: <FaMoneyBillWave />, path: "/admin/payroll" },
    { id: "performance", label: "Performance", icon: <FaChartLine />, path: "/admin/performance" },
    { id: "settings", label: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">HR</div>
          <h2 className="logo-text">HR System</h2>
        </div>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? "active" : ""}`
            }
            onClick={toggleSidebar}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item logout">
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


