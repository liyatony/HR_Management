// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeProfile from "./components/employee/EmployeeProfile"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/profile/:id" element={<EmployeeProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
