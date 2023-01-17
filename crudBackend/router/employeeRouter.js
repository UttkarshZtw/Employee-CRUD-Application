const router = require("express").Router();
const employeeController = require("../controller/employee.js");
// api : '/' Method : GET ;  getting all the employees

// router.get("/", employeeController.getEmployees);

// api : '/:id' Method GET ; Find one by Id

router.get("/:id", employeeController.getEmployee);

// api : '/search?key=' Method GET ; Find query of
router.get("/employee/search", employeeController.searchEmployees);

// api : '/' Method : POST ; Adding a new Employee
router.post("/", employeeController.createEmployee);

// api : '/' Method : PUT ; Updating an existing employee

router.put("/:id", employeeController.editEmployee);

// api : '/' Method : DELETE ; deleteing an existing employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
