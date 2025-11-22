const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;

mongoose.connect(url)
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.error("db connection failed ", err);
  });
