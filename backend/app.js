const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const leaveRoutes = require("./routes/leaveRoutes")
const payrollRoutes = require("./routes/payrollRoutes")

require("./config/bd_employee");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const employee_route = require("./routes/admin_act");
app.use("/emp", employee_route);

const employeeroutes = require("./routes/employeeRoutes");
app.use("/api", employeeroutes);





const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/attendance", attendanceRoutes);



const employeeRoutes = require("./routes/admin_act");
app.use("/emp", employeeRoutes);

app.use("/api", leaveRoutes);
app.use("/api", payrollRoutes);


const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

