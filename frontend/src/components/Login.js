import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const adminCredentials = {
  username: "Admin",
  password: "Admin"
};

const employeeCredentials = [
  { username: "Masum", password: "Masum123" },
  { username: "Harsh", password: "Harsh123" },
  { username: "Ronit", password: "Ronit123" },
  { username: "Sumit", password: "Sumit123" },
  { username: "Veer", password: "Veer123" },
  { username: "Jamin", password: "Jamin123" },
  { username: "Monil", password: "Monil123" },
  { username: "Rahil", password: "Rahil123" },
  { username: "Ayush", password: "Ayush123" },
  { username: "Dip", password: "Dip123" }
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      if (role === "admin") {
        if (username === adminCredentials.username && password === adminCredentials.password) {
          localStorage.setItem("loggedInUser", username);
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else {
          alert("Invalid admin credentials");
        }
      } else if (role === "employee") {
        const validEmployee = employeeCredentials.find(
          (emp) => emp.username === username && emp.password === password
        );
        if (validEmployee) {
          localStorage.setItem("loggedInUser", username);
          localStorage.setItem("role", "employee");
          navigate("/employee");
        } else {
          alert("Invalid employee credentials");
        }
      }
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="container-center">
      <form onSubmit={handleLogin} className="form-card" noValidate>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
