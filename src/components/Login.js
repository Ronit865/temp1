import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const adminCredentials = {
  username: "admin",
  password: "admin"
};

const employeeCredentials = [
  { username: "alice", password: "alice123" },
  { username: "bob", password: "bob123" },
  { username: "charlie", password: "charlie123" },
  { username: "diana", password: "diana123" },
  { username: "ethan", password: "ethan123" },
  { username: "fiona", password: "fiona123" },
  { username: "george", password: "george123" },
  { username: "hannah", password: "hannah123" },
  { username: "ian", password: "ian123" },
  { username: "jane", password: "jane123" }
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
          navigate("/admin");
        } else {
          alert("Invalid admin credentials");
        }
      } else if (role === "employee") {
        const validEmployee = employeeCredentials.find(
          (emp) => emp.username === username && emp.password === password
        );
        if (validEmployee) {
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
      <form onSubmit={handleLogin} className="form-card">
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
