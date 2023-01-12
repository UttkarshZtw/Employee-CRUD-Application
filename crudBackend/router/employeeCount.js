const router = require("express").Router();
const { EmployeeCount } = require("../models/employeeCount.js");
const employeeCountController = require("../controller/employeeCount.js");
router.get("/", employeeCountController.getEmployeeCount);
router.get("/update", employeeCountController.updateEmployeeCount);
module.exports = router;
