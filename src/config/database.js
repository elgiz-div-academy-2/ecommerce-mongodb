const mongoose = require("mongoose");
const config = require(".");

mongoose
  .connect(config.databaseURL)
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
