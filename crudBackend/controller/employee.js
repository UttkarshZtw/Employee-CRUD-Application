const employeeServices = require("../services/employeeServices");

exports.getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const getEmployee = await employeeServices.getEmployee(id);
    console.log(typeof getEmployee);
    res.status(200).json({ getEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const getEmployees = await employeeServices.searchEmployees(
      page,
      limit,
      filter
    );
    res.status(200).json({ getEmployees });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, name, dateOfBirth, salary, skills, photo } = req.body;
    if (!employeeId || !name || !dateOfBirth || !salary || !skills || !photo)
      throw new Error("Some of the parameters are missing !");
    const createdEmployee = await employeeServices.createEmployee(
      employeeId,
      name,
      dateOfBirth,
      salary,
      skills,
      photo
    );
    res.status(200).json({ createdEmployee });
  } catch (error) {
    res.send(400).json({ err: error.message });
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    if (!id || !update) {
      throw new Error("Some parameters are missing !");
    }
    const updatedEmployee = await employeeServices.editEmployee(id, update);
    res.status(200).json({ updatedEmployee });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("_id required to delete an employee !");
    }
    const deletedEmployee = await employeeServices.deleteEmployee(id);
    res.status(200).json({ deletedEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.softDelete = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("_id required to delete an employee");
    const softDeletedEmployee = await employeeServices.softDelete(id);
    res.status(200).json({ softDeletedEmployee });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
