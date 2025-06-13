import { useState } from "react";
import '../styles.css';

export default function Register({ onClose, employee }) {
  const [username, setUsername] = useState(employee ? employee.user : "");
  const [name, setName] = useState(employee ? employee.name : "");
  const [position, setPosition] = useState(employee ? employee.position : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [phone, setPhone] = useState(employee ? employee.phone : "");
  const [department, setDepartment] = useState(employee ? employee.department : "");
  const [location, setLocation] = useState(employee ? employee.location : "");
  const [joiningDate, setJoiningDate] = useState(employee ? employee.joiningDate : "");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      id: employee ? employee._id : Date.now(),
      user: username,
      name,
      position,
      email,
      phone,
      department,
      location,
      joiningDate,
    };

    try {
      const response = await fetch(employee ? `/api/employees/${employee._id}` : '/api/employees', {
        method: employee ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(employee ? 'Update successful!' : 'Registration successful!');
        // Clear form fields only if new registration
        if (!employee) {
          setUsername("");
          setName("");
          setPosition("");
          setEmail("");
          setPhone("");
          setDepartment("");
          setLocation("");
          setJoiningDate("");
        }
        if (onClose) {
          onClose();
        }
      } else {
        alert((employee ? 'Update' : 'Registration') + ' failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during ' + (employee ? 'update' : 'registration') + ':', error);
      alert('An error occurred during ' + (employee ? 'update' : 'registration') + '. Please try again.');
    }
  };

  return (
    <div className="register-container-center">
      <form onSubmit={handleRegister} className="form-card" noValidate>
        <h2>Employee Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">User</label>
            <input
              id="user"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
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
              placeholder="Enter your position"
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
              placeholder="Enter your email"
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
              placeholder="Enter your phone number"
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
              placeholder="Enter your department"
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
              placeholder="Enter your location"
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
              placeholder="yyyy-mm-dd"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>
        </div>
      <button type="submit">{employee ? "Update" : "Add"}</button>
    </form>
  </div>
  );
}
