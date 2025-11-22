import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";

import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeProfile from "./components/employee/EmployeeProfile";

import MarkAttendance from "./components/attendance/MarkAttendance";
import AttendanceHistory from "./components/attendance/AttendanceHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Login />} />

   
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/attendance-history" element={<AttendanceHistory />} />

    
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/profile/:id" element={<EmployeeProfile />} />

      </Routes>
    </BrowserRouter>
  );
}
