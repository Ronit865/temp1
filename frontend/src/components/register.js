import { useState } from "react";
import '../styles.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = {
      id: Date.now(),
      username,
      name,
      position,
      email,
      phone,
      department,
      location,
      joiningDate,
    };

    // Get existing newEmployees from localStorage or initialize empty array
    const existingNewEmployees = JSON.parse(localStorage.getItem("newEmployees")) || [];

    // Add new employee data
    existingNewEmployees.push(formData);

    // Save back to localStorage
    localStorage.setItem("newEmployees", JSON.stringify(existingNewEmployees));

    console.log("Register form data saved:", formData);

    // Optionally clear form fields after registration
    setUsername("");
    setName("");
    setPosition("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setLocation("");
    setJoiningDate("");
  };

  return (
    <div className="register-container-center">
      <form onSubmit={handleRegister} className="form-card" noValidate>
        <h2>Register</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
