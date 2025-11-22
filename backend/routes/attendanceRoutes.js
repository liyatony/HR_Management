const express = require("express");
const router = express.Router();

const { 
  markAttendance, 
  getHistory,
  checkOut 
} = require("../controllers/attendanceController");

// Mark attendance (Check-In)
router.post("/mark", markAttendance);

// Check-out
router.put("/checkout/:attendanceId", checkOut);

// Get attendance history
router.get("/history/:employeeId", getHistory);

module.exports = router;
