const Attendance = require("../models/attendance_model");
const mongoose = require("mongoose");

// -------------------- MARK ATTENDANCE --------------------
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId || !mongoose.isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "employeeId missing or invalid" });
    }

    const today = new Date();
    const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const already = await Attendance.findOne({
      employeeId,
      date: { $gte: dateOnly, $lt: new Date(dateOnly.getTime() + 24 * 60 * 60 * 1000) }
    });

    if (already) {
      return res.status(409).json({ message: "Already marked for today" });
    }

    const now = today.toTimeString().split(" ")[0];
    const employeeName = req.body.employeeName || "Employee";

    const att = new Attendance({
      employeeId,
      employeeName,
      date: dateOnly,
      checkIn: now,
      status: "present",
    });

    await att.save();
    return res.status(201).json({ message: "Attendance marked", attendance: att });
  } catch (err) {
    console.error("markAttendance error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- CHECK-OUT --------------------
exports.checkOut = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const record = await Attendance.findById(attendanceId);
    if (!record) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Current checkout time
    const now = new Date();
    const checkoutTime = now.toTimeString().split(" ")[0];

    // Calculate total hours
    const checkInDate = new Date(record.date);
    const [h, m, s] = record.checkIn.split(":");

    checkInDate.setHours(h, m, s, 0);
    const totalHoursMs = now - checkInDate;
    const totalHours = (totalHoursMs / (1000 * 60 * 60)).toFixed(2);

    const overtime = totalHours > 8 ? (totalHours - 8).toFixed(2) : 0;

    // Update attendance
    record.checkOut = checkoutTime;
    record.totalHours = totalHours;
    record.overtimeHours = overtime;

    await record.save();

    return res.json({
      message: "Checked out successfully",
      attendance: record,
    });

  } catch (err) {
    console.error("checkOut error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- HISTORY --------------------
exports.getHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    if (!employeeId || !mongoose.isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "employeeId missing or invalid" });
    }

    const records = await Attendance.find({ employeeId })
      .sort({ date: -1 })
      .limit(100);

    return res.json(records);
  } catch (err) {
    console.error("getHistory error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
