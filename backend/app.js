const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");


require("./config/bd_employee");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/attendance", attendanceRoutes);



const employeeRoutes = require("./routes/admin_act");
app.use("/emp", employeeRoutes);

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
