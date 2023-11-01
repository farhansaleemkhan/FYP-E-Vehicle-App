const express = require("express");
const auth = require("../routes/auth");
const { router: users } = require("../routes/users");
const company = require("../routes/company/company");
const department = require("../routes/company/department");
const employee = require("../routes/company/employee");
const vehicle = require("../routes/vehicle/vehicle");
const vehicleType = require("../routes/vehicle/vehicleType");
const fuelType = require("../routes/vehicle/fuelType");
const parking = require("../routes/parking/parking");
const parkingArea = require("../routes/parking/parkingArea");
const location = require("../routes/parking/locaion");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/companies", company);
  app.use("/api/departments", department);
  app.use("/api/employees", employee);
  app.use("/api/vehicles", vehicle);
  app.use("/api/vehicle-types", vehicleType);
  app.use("/api/fuel-types", fuelType);
  app.use("/api/parkings", parking);
  app.use("/api/parking-areas", parkingArea);
  app.use("/api/locations", location);
  app.use(error);
};