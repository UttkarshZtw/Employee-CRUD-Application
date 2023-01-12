const { EmployeeCount } = require("../models/employeeCount.js");

exports.updateEmployeeCount = async (req, res) => {
  try {
    const updatedCount = await EmployeeCount.updateOne({ $inc: { id: 1 } });
    const data = await EmployeeCount.find();
    res.status(200).json({ msg: updatedCount, data: data[0].id });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
