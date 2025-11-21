// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeProfile from "./components/employee/EmployeeProfile"
import EmployeePayroll from "../src/components/employee/EmployeePayroll"
import Reports from "./components/adminpages/Reports"
import Performance from "./components/adminpages/Performance";
import LeaveManagement from "./components/adminpages/LeaveManagement"
import Attendance from "./components/adminpages/Attendance"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/profile/:id" element={<EmployeeProfile />} />
        <Route path="/admin/payroll" element={<EmployeePayroll/>}/>
         <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/performance" element={<Performance />} />
        <Route path="/admin/leave-management" element={<LeaveManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
