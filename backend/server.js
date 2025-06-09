const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Login API
app.post('/login', async (req, res) => {
  const { user, joiningDate } = req.body;

  if (!user || !joiningDate) {
    return res.status(400).json({ message: 'User and joiningDate are required' });
  }

  try {
    const foundUser = await User.findOne({ user, joiningDate });
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
