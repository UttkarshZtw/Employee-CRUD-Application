const mongoose = require("mongoose");
const { Schema } = mongoose;
const employeeCountSchema = new Schema({
  id: {
    type: Number,
    required: true,
    default: 0,
  },
});
const EmployeeCount = mongoose.model("count", employeeCountSchema);
module.exports = { EmployeeCount };
