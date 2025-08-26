import { useState } from "react";
import '../styles.css';

export default function Add({ onClose }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!username || !name || !position || !email || !phone || !department || !location || !joiningDate) {
      alert('Please fill in all fields');
      return;
    }

    const formData = {
      id: Date.now(), // Generate a unique ID
      user: username,
      name,
      position,
      email,
      phone,
      department,
      location,
      joiningDate,
    };

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        alert('Employee added successfully!');
        // Clear form fields
        setUsername("");
        setName("");
        setPosition("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setLocation("");
        setJoiningDate("");
        if (onClose) {
          onClose();
        }
        // Refresh the page to show the new user
        window.location.reload();
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="register-container-center">
      <form onSubmit={handleRegister} className="form-card" noValidate>
        <h2>Add New Employee</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              id="position"
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">ADD EMPLOYEE</button>
      </form>
    </div>
  );
}
