const { Employee } = require("../models/employee.js");

exports.getEmployee = async (employeeId) => {
  const getEmployee = await Employee.findById(employeeId);
  if (!getEmployee) {
    throw new Error("Employee dose not exist in database !");
  }
  return getEmployee;
};

exports.searchEmployees = async (page, limit, filter) => {
  if (page < 0 || limit < 0) {
    throw new Error("Page or limit underflow !");
  }
  const getEmployees = await Employee.find({
    $or: [
      { name: { $regex: `.*${filter}.*`, $options: "i" } },
      { employeeId: { $regex: `.*${filter}.*`, $options: "i" } },
      { skills: { $regex: `.*${filter}.*`, $options: "i" } },
    ],
    $and: [{ isDeleted: false }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return getEmployees;
};

exports.createEmployee = async (
  employeeId,
  name,
  dateOfBirth,
  salary,
  skills,
  photo
) => {
  const newEmployee = new Employee({
    employeeId,
    name,
    dateOfBirth,
    salary,
    skills,
    photo,
  });
  const employeeSaveRes = await newEmployee.save(newEmployee);
  if (!employeeSaveRes) throw new Error("Not able to save your response !");
  return employeeSaveRes;
};

exports.editEmployee = async (id, update) => {
  const options = { new: "true" };
  const updatedEmployee = await Employee.findByIdAndUpdate(id, update, options);
  if (!updatedEmployee) {
    throw new Error("Employee dose not exist!");
  }
  return updatedEmployee;
};

exports.deleteEmployee = async (id) => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (deletedEmployee === null || deletedEmployee === undefined)
    throw new Error("Unable to delete an employee ");
  return deletedEmployee;
};

exports.softDelete = async (id) => {
  const options = { new: "true" };
  const update = { isDeleted: true };
  const softDelete = await Employee.findByIdAndUpdate(id, update, options);
  return softDelete;
};
