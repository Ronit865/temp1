const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/EmployeeCreds';

mongoose.connect(mongoURI, {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
