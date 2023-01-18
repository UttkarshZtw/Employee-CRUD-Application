const mongoose = require("mongoose");

// employee schema

const { Schema } = mongoose;
const employeeSchama = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    default: Date.now,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  photo: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// mongodb by default creates the collection with the plural of schema name
//i.e. Schema Name : Employee ;
// collection name : employees
const Employee = mongoose.model("Employee", employeeSchama);
module.exports = { Employee };
