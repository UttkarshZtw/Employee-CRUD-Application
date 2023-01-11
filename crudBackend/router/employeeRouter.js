const router = require("express").Router();
const { Employee } = require("../models/employee.js");

// api : '/' Method : GET ;  getting all the employees

router.get("/", async (req, res) => {
  try {
    const getAllEmployees = await Employee.find();
    res.status(200).json({ data: getAllEmployees });
  } catch (error) {
    res.json(500).json({ err: error.message });
  }
});

// api : '/:id' Method GET ; Find one by Id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getEmployee = await Employee.findById(id);
    if (!getEmployee) {
      throw createErrors(404, "Employee dose not exist in database !");
    }
    res.status(200).json({ getEmployee });
  } catch (error) {
    res.status.apply(500).json({ err: error.message });
  }
});

// api : '/' Method : POST ; Adding a new Employee
router.post("/", async (req, res) => {
  try {
    const { name, dateOfBirth, salary, skills, photo } = req.body;
    const newEmployee = new Employee({
      name,
      dateOfBirth,
      salary,
      skills,
      photo,
    });
    const employeeSaveRes = await newEmployee.save(newEmployee);
    res.status(200).json({ employeeSaveRes });
  } catch (error) {
    res.send(500).json({ err: error.message });
  }
});

// api : '/' Method : PUT ; Updating an existing employee

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: "true" };
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      update,
      options
    );
    if (!updatedEmployee) {
      throw createErrors(404, "Employee dose not exist!");
    }
    res.status(200).json({ updatedEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// api : '/' Method : DELETE ; deleteing an existing employee
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      res.json({ msg: "Error deleting the employee !" });
      throw createErrors(404, "Student dose not exist!");
    }
    res.status(200).json({ deletedEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
