const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.js');
const Employee = require('./models/Employee.js');
// const mongoURI= 'mongodb+srv://rajdhimmar4:Ronit_865@cluster0.yfl8iyy.mongodb.net/EmployeeCreads'
const mongoURI= 'mongodb+srv://appiflyinfotech:dZNWYc3vlLHD5ztC@cluster0.b3pdx.mongodb.net/EmployeeCreds'
require('dotenv').config({
  path:'./.env'
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// const mongoURI = process.env.MONGO_URI || 'cluster0.yfl8iyy.mongodb.net/EmployeeCreds';
// const DB_NAME = 'EmployeeCreds';
mongoose.connect(`${mongoURI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/api/login', async (req, res) => {
  const { user, joiningDate } = req.body;

  console.log('Login attempt with user:', user, 'joiningDate:', joiningDate);

  if (!user || !joiningDate) {
    return res.status(400).json({ message: 'User and joiningDate are required' });
  }

  try {
    // Parse joiningDate to Date object and create date range for the day
    const date = new Date(joiningDate);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    // Query user with user and joiningDate within the date range ignoring time
    const foundUser = await User.findOne({
      user,
      joiningDate: {
        $gte: date,
        $lt: nextDate
      }
    });

    console.log('Found user:', foundUser);
    if (foundUser) {
      return res.json({ success: true, role: foundUser.role });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Removed GET /api/login route as it is unnecessary and problematic

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { user: 1, joiningDate: 1, role: 1, _id: 0 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json({ success: true, employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/employees', async (req, res) => {
  const { id, user, joiningDate, name, position, email, phone, department, location } = req.body;

  if (!id || !user || !joiningDate || !name || !position || !email || !phone || !department || !location) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingEmployee = await Employee.findOne({ user });
    if (existingEmployee) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const newEmployee = new Employee({
      id,
      user,
      joiningDate,
      name,
      position,
      email,
      phone,
      department,
      location
    });

    await newEmployee.save();

    // Also add user to users collection with role "employee"
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists in users collection' });
    }

    const newUser = new User({
      user,
      joiningDate,
      role: 'employee'
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'Employee registered successfully' });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { user, joiningDate, name, position, email, phone, department, location } = req.body;

  if (!user || !joiningDate || !name || !position || !email || !phone || !department || !location) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { user, joiningDate, name, position, email, phone, department, location },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Also update user in users collection
    const updatedUser = await User.findOneAndUpdate(
      { user: updatedEmployee.user },
      { user, joiningDate },
      { new: true }
    );

    res.json({ success: true, message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Also remove user from users collection
    await User.deleteOne({ user: deletedEmployee.user });

    res.json({ success: true, message: 'Employee removed successfully' });
  } catch (error) {
    console.error('Error removing employee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// User role management endpoints
app.put('/api/users/:username/role', async (req, res) => {
  const { username } = req.params;
  const { role } = req.body;

  if (!role || !['admin', 'employee'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Valid role (admin or employee) is required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { user: username },
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  console.log('DELETE request received for username:', username);

  try {
    const deletedUser = await User.findOneAndDelete({ user: username });
    console.log('Deleted user from User collection:', deletedUser);

    if (!deletedUser) {
      console.log('User not found in database');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Also remove from employees collection if exists
    const deletedEmployee = await Employee.deleteOne({ user: username });
    console.log('Deleted from Employee collection:', deletedEmployee);

    res.json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Debug endpoint to see all users
app.get('/api/debug/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
