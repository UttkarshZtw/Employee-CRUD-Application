const router = require("express").Router();
const employeeCountController = require("../controller/employeeCount.js");
router.get("/update", employeeCountController.updateEmployeeCount);
module.exports = router;
