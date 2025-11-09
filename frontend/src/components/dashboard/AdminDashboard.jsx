import React, { useState } from "react";
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaChartLine,
  FaTachometerAlt,
  FaUserTie,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaStar,
  FaCog,
  FaBars,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaTimes
} from "react-icons/fa";
import "../../styles/dashboard.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'employees', label: 'Employees', icon: <FaUsers /> },
    { id: 'attendance', label: 'Attendance', icon: <FaCalendarCheck /> },
    { id: 'leaves', label: 'Leave Management', icon: <FaClipboardList /> },
    { id: 'payroll', label: 'Payroll', icon: <FaMoneyBillWave /> },
    { id: 'performance', label: 'Performance', icon: <FaChartLine /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const statsCards = [
    { 
      title: 'Total Employees', 
      value: '124', 
      change: '+8 this month',
      changeType: 'positive',
      icon: <FaUsers />, 
      color: '#4f46e5',
      bgColor: '#eef2ff' 
    },
    { 
      title: 'Attendance Rate', 
      value: '98.2%', 
      change: '+2.3% from last month',
      changeType: 'positive',
      icon: <FaCalendarCheck />, 
      color: '#059669',
      bgColor: '#ecfdf5' 
    },
    { 
      title: 'Monthly Payroll', 
      value: '₹3.2L', 
      change: 'Processed on time',
      changeType: 'neutral',
      icon: <FaMoneyBillWave />, 
      color: '#dc2626',
      bgColor: '#fef2f2' 
    },
    { 
      title: 'Avg Performance', 
      value: '87.5%', 
      change: '+5.2% improvement',
      changeType: 'positive',
      icon: <FaChartLine />, 
      color: '#ea580c',
      bgColor: '#fff7ed' 
    }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'marked attendance', time: '10 mins ago', icon: <FaCheckCircle />, color: '#059669' },
    { user: 'Priya Sharma', action: 'approved leave request', time: '25 mins ago', icon: <FaCheckCircle />, color: '#059669' },
    { user: 'System', action: 'generated monthly payroll', time: '1 hour ago', icon: <FaFileInvoiceDollar />, color: '#4f46e5' },
    { user: 'Rajesh Kumar', action: 'submitted performance review', time: '2 hours ago', icon: <FaStar />, color: '#ea580c' },
    { user: 'Admin', action: 'added new employee', time: '3 hours ago', icon: <FaUserTie />, color: '#0891b2' }
  ];

  const pendingRequests = [
    { type: 'Leave Request', employee: 'Sarah Johnson', department: 'Marketing', status: 'pending', icon: <FaHourglassHalf /> },
    { type: 'Leave Request', employee: 'Mike Chen', department: 'Engineering', status: 'pending', icon: <FaHourglassHalf /> },
    { type: 'Attendance Appeal', employee: 'Lisa Anderson', department: 'HR', status: 'pending', icon: <FaHourglassHalf /> },
    { type: 'Leave Request', employee: 'David Brown', department: 'Sales', status: 'pending', icon: <FaHourglassHalf /> }
  ];

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">HR</div>
            <h2 className="logo-text">HR System</h2>
          </div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveMenu(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item logout">
            <span className="nav-icon"><FaSignOutAlt /></span>
            <span className="nav-label">Logout</span>
          </div>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="navbar-left">
            <button 
              className="toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <div className="page-title">
              <h1>Dashboard</h1>
              <p className="page-subtitle">Welcome back, Admin</p>
            </div>
          </div>

          <div className="navbar-right">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            
            <button className="icon-btn notification-btn">
              <FaBell />
              <span className="badge">3</span>
            </button>

            <div className="user-profile">
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff" 
                alt="Admin" 
                className="profile-img"
              />
              <div className="profile-info">
                <span className="profile-name">Admin User</span>
                <span className="profile-role">HR Manager</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content-area">
          <div className="stats-grid">
            {statsCards.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card-body">
                  <div className="stat-info">
                    <p className="stat-title">{stat.title}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                    <span className={`stat-change ${stat.changeType}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div className="panel activity-panel">
              <div className="panel-header">
                <h3 className="panel-title">Recent Activities</h3>
                <button className="btn-text">View All</button>
              </div>
              <div className="panel-body">
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon" style={{ color: activity.color }}>
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">
                          <strong>{activity.user}</strong> {activity.action}
                        </p>
                        <span className="activity-time">
                          <FaClock /> {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel requests-panel">
              <div className="panel-header">
                <h3 className="panel-title">Pending Requests</h3>
                <span className="badge-count">{pendingRequests.length}</span>
              </div>
              <div className="panel-body">
                <div className="requests-list">
                  {pendingRequests.map((request, index) => (
                    <div key={index} className="request-item">
                      <div className="request-icon">
                        {request.icon}
                      </div>
                      <div className="request-content">
                        <p className="request-type">{request.type}</p>
                        <p className="request-employee">{request.employee}</p>
                        <span className="request-dept">{request.department}</span>
                      </div>
                      <div className="request-actions">
                        <button className="btn-icon btn-approve" title="Approve">
                          <FaCheckCircle />
                        </button>
                        <button className="btn-icon btn-reject" title="Reject">
                          <FaTimesCircle />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel-footer">
                <button className="btn-secondary btn-block">View All Requests</button>
              </div>
            </div>
          </div>

          <div className="quick-actions-section">
            <h3 className="section-title">Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-card">
                <div className="action-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <FaUserTie />
                </div>
                <span className="action-label">Add Employee</span>
              </button>
              <button className="action-card">
                <div className="action-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                  <FaCalendarCheck />
                </div>
                <span className="action-label">Mark Attendance</span>
              </button>
              <button className="action-card">
                <div className="action-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                  <FaFileInvoiceDollar />
                </div>
                <span className="action-label">Generate Payroll</span>
              </button>
              <button className="action-card">
                <div className="action-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                  <FaChartLine />
                </div>
                <span className="action-label">View Reports</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;