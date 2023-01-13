const { Employee } = require("../models/employee.js");

exports.getEmployees = async (req, res) => {
  try {
    const getAllEmployees = await Employee.find();
    if (Object.keys(req.query).length > 0) {
      const { page, limit } = req.query;
      const employeeLimitData = await Employee.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).json({ data: employeeLimitData });
    } else {
      res.status(200).json({ data: getAllEmployees });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const getEmployee = await Employee.findById(id);
    if (!getEmployee) {
      throw createErrors(404, "Employee dose not exist in database !");
    }
    res.status(200).json({ getEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { filter } = req.query;
    // const filterQuery = `/${filter}/i`;
    // const employeeBySkills = await Employee.find({
    //   skills: { $in: ["/back/i"] },
    // });
    console.log(employeeBySkills);
    const getEmployees = await Employee.find({
      $or: [
        { name: { $regex: `.*${filter}.*`, $options: "i" } },
        { employeeId: { $regex: `.*${filter}.*`, $options: "i" } },
        { skills: { $regex: `.*${filter}.*`, $options: "i" } },
      ],
    });
    res.status(200).json({ getEmployees });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, name, dateOfBirth, salary, skills, photo } = req.body;
    const newEmployee = new Employee({
      employeeId,
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
};

exports.editEmployee = async (req, res) => {
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
};

exports.deleteEmployee = async (req, res) => {
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
};
