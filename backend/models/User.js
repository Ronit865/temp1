const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  joiningDate: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
