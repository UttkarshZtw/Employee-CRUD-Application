const { EmployeeCount } = require("../models/employeeCount.js");

exports.getEmployeeCount = async (req, res) => {
  try {
    const getEmployeeId = await EmployeeCount.find();
    res.status(200).json({ id: getEmployeeId });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.updateEmployeeCount = async (req, res) => {
  try {
    const updatedCount = await EmployeeCount.updateOne({ $inc: { id: 1 } });
    res.status(200).json({ updatedCount });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
