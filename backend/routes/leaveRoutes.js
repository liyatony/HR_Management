const express = require("express");
const router = express.Router();
const { createLeaveRequest } = require("../controllers/leaveController");

router.post("/leave/apply", createLeaveRequest);

module.exports = router;
