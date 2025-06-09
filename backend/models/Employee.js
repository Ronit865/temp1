const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  user: { type: String, required: true, unique: true },
  joiningDate: { type: Date, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema, 'emp');

module.exports = Employee;
