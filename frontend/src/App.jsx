import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";

import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeProfile from "./components/employee/EmployeeProfile";

import EmployeePayroll from "../src/components/employee/EmployeePayroll"
import Reports from "./components/adminpages/Reports"
import Performance from "./components/adminpages/Performance";
import LeaveManagement from "./components/adminpages/LeaveManagement"
import Attendance from "./components/adminpages/Attendance"

import MarkAttendance from "./components/attendance/MarkAttendance";
import AttendanceHistory from "./components/attendance/AttendanceHistory";
import ViewProfile from "./components/employees/ViewProfile";
import ApplyLeave from "./components/employees/ApplyLeave";
import PaySlips from "./components/employees/Payslip";

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

        <Route path="/admin/payroll" element={<EmployeePayroll/>}/>
         <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/performance" element={<Performance />} />
        <Route path="/admin/leave-management" element={<LeaveManagement />} />
      
       <Route path="/employee/profile" element={<ViewProfile />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/payslips" element={<PaySlips />} />
      </Routes>
    </BrowserRouter>
  );
}2
