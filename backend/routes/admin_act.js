const express = require("express");
const router = express.Router();
const multer = require("multer");
const randomPass = require("../utils/password_generater");
const employee = require("../models/employee_model");
const attendance = require("../models/attendance_model");
const payroll = require("../models/payroll_model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const payrollEmailTemplate=require("../utils/payrollemailTemplate")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "llamastone20@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.delete("/delete/:id", async (req, res) => {
  try {
    const employee_id = req.params.id;
    const deletion = await employee.findByIdAndDelete(employee_id);
    if (!deletion) {
      return res
        .status(400)
        .json({ message: "employee not found..deletiom failled" });
    }

    res.status(200).json({ message: "deletion sucessful.." });
  } catch (error) {
    console.error("error deleting employee", error);
    res.status(500).json({ message: "deletion failled", error });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  console.log(req.params.id);
  console.log(req.file);

  let updated_employee_details = req.body;
  let employee_id = req.params.id;
  let updated_employee_file = req.file ? req.file.path : null;
  let updated_employee_data = {
    ...updated_employee_details,
    ...(updated_employee_file && { image: updated_employee_file }),
  };
  try {
    const existingEmployee = await employee.findOne({
      email: updated_employee_details.email,
      _id: { $ne: employee_id }, //avoiding current employee email
    });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const updated_employee = await employee.findByIdAndUpdate(
      employee_id,
      updated_employee_data,
      { new: true }
    );

    res.json({
      message: "Employee updated successfully",
      data: updated_employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await employee.find();
    res.status(200).json({ message: "employee data fetched", data: data });
  } catch (error) {
    console.error("employee data fetching error", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/attendance", async (req, res) => {
  try {
    const result = await attendance.aggregate([
      // Ensure only documents with valid date
      { $match: { date: { $exists: true, $ne: null } } },

      // Convert date string to Date object if needed
      {
        $addFields: {
          dateObj: { $toDate: "$date" },
        },
      },

      // Group by employee + year + month
      {
        $group: {
          _id: {
            employeeId: "$employeeId",
            employeeName: "$employeeName",
            year: { $year: "$dateObj" },
            month: { $month: "$dateObj" },
          },
          totalPresentDays: {
            $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
          },
          totalLeaveDays: {
            $sum: { $cond: [{ $eq: ["$status", "leave"] }, 1, 0] },
          },
          totalOvertimeHours: { $sum: { $ifNull: ["$overtimeHours", 0] } },
          totalHoursWorked: { $sum: { $ifNull: ["$totalHours", 0] } },
          totalAbsentDays: {
            $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
          },
        },
      },

      // Sort by employee and month
      { $sort: { "_id.employeeName": 1, "_id.year": 1, "_id.month": 1 } },
    ]);

    const formatted = result.map((r) => ({
      empId: r._id.employeeId,
      name: r._id.employeeName,
      month: `${r._id.year}-${r._id.month.toString().padStart(2, "0")}`,
      presentDays: r.totalPresentDays,
      leaves: r.totalLeaveDays,
      overtime: r.totalOvertimeHours,
      totalAbsentDays: r.totalAbsentDays,
    }));

    res.status(200).json({ message: "employee data fetched", data: formatted });
  } catch (error) {
    console.error("employee data fetching error:", error);
    res.status(500).json({ error: error.message });
  }
});




router.post("/allmonthlypayrolls", async (req, res) => {
  try {
    const data = req.body;
    if (!data || data.length === 0) {
      return res.status(400).json({ error: "Merged payroll is empty." });
    }

    // Save only NEW payrolls (don't overwrite existing ones)
    const saved = await Promise.all(
      data.map(async (row) => {
        // Check if record already exists
        const existing = await payroll.findOne({ 
          empId: row.empId, 
          month: row.month 
        });

        // Only create if doesn't exist
        if (!existing) {
          return payroll.create(row);
        }
        
        // Return existing record without modifying it
        return existing;
      })
    );

    const newCount = saved.filter(s => s.status === 'pending').length;

    res.status(200).json({
      message: `Payroll data processed: ${newCount} new records created`,
      data: saved,
    });
  } catch (error) {
    console.error("Payroll save error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});



router.get("/allpayrolls", async (req, res) => {
  try {
    const data = await payroll.find();

    res.status(200).json({
      message: "payroll fetched",
      data,
    });
  } catch (error) {
    console.error("payroll data fetching error", error);
  }
});




router.put("/updatepayrolls/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

    if (!data) {
    return res.status(400).json({ message: "No payroll data provided" });
  }

  try {
    const checking =await payroll.findById(id)
    if(checking.status==="processed"){
      return res.status(400).json({message:"status already changed"})


    }
    const updatedPayrolls = await payroll.findByIdAndUpdate(id, data, { new: true });

    if (!updatedPayrolls) {
      return res.status(404).json({ message: "Payroll not found" });
    }
    res.status(200).json({message:`${id} s payroll status updated`,updatedPayrolls:updatedPayrolls})

    
    const email_Employee_Details=await payroll.findById(id);

   const template = payrollEmailTemplate(email_Employee_Details);
   console.log(email_Employee_Details.email);
   

     (async () => {
      const info = await transporter.sendMail({
        from: '"HR-SYSTEMS" <llamastone20@gmail.com>',
        to: `${email_Employee_Details.email}`,
        subject: "Welcome to the Team and Your Account Details",
        html: template, // HTML body
      }).catch((err)=>{
        console.error("email sending failled ",err)

      })

      console.log("Message sent:", info.messageId);
    })();



  


  } catch (error) {

    console.error("Error updating payroll:", error);
    res.status(500).json({ message: "Server error" });


  }
});





router.post("/add", upload.single("image"), async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const existingEmployee = await employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const saltRounds = 10;
    const myPlaintextPassword = randomPass();
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

    

    let employee_details = req.body;

    let employee_file = req.file ? req.file.path : null;

    const employee_data = new employee({
      ...employee_details,
      image: employee_file,
      passwordHash: hash,
    });
    await employee_data.save();

    //nodemailer --->>

    const htmlMessage = `
< div style="font-family: Arial, sans-serif; color:#333;">
  <h2 style="margin-top:0;">Welcome to the Company!</h2>
  
  <p>Hi <strong>${employee_data.name}</strong>,</p>
  <p>Your employee account has been successfully created.</p>

  <h3 style="margin-bottom:5px;">Login Details</h3>
  <p style="line-height:1.6;">
    <strong>Email:</strong> ${employee_data.email} <br>
    <strong>Temporary Password:</strong> ${myPlaintextPassword}
  </p>

  <p>Please log in and change your password immediately after your first login.</p>

  <p>Regards,<br><strong>HR Department</strong></p>
</div>
`;

    const plainTextMessage = `
Welcome to the Company!

Hi ${employee_data.name},

Your employee account has been successfully created.

Login Details:
Email: ${employee_data.email}
Temporary Password: ${myPlaintextPassword}

Please log in and change your password immediately after your first login.

Regards,
HR Department
`;

    // Wrap in an async IIFE so we can use await.
    (async () => {
      const info = await transporter.sendMail({
        from: '"HR-SYSTEMS" <llamastone20@gmail.com>',
        to: `${employee_data.email}`,
        subject: "Welcome to the Team and Your Account Details",
        text: plainTextMessage, // plain‑text body
        html: htmlMessage, // HTML body
      });

      console.log("Message sent:", info.messageId);
    })();

    //----->>>>>

    console.log(employee_data);

    res.status(200).send({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error in /emp/add:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get;

module.exports = router;
