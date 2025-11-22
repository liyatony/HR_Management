import axios from "axios";

const API = "http://localhost:4300";

export const markAttendanceAPI = (employeeId) =>
  axios.post(`${API}/attendance/mark`, { employeeId });

export const getAttendanceHistoryAPI = (employeeId) =>
  axios.get(`${API}/attendance/history/${employeeId}`);
