import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const adminCredentials = {
  username: "Admin",
  password: "Admin"
};

const employeeCredentials = [
  { joiningDate: "2022-08-08", password: "Masum123" },
  { joiningDate: "2021-06-20", password: "Harsh123" },
  { joiningDate: "2020-11-05", password: "Ronit123" },
  { joiningDate: "2019-08-12", password: "Sumit123" },
  { joiningDate: "2023-03-01", password: "Veer123" },
  { joiningDate: "2022-07-18", password: "Jamin123" },
  { joiningDate: "2021-12-30", password: "Monil123" },
  { joiningDate: "2020-04-25", password: "Rahil123" },
  { joiningDate: "2019-09-10", password: "Ayush123" },
  { joiningDate: "2023-02-14", password: "Dip123" }
];

export default function Login() {
  const [joiningDate, setJoiningDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if ((role === "admin" && joiningDate && password) || (role === "employee" && joiningDate && password)) {
      if (role === "admin") {
        if (joiningDate === adminCredentials.username && password === adminCredentials.password) {
          localStorage.setItem("loggedInUser", joiningDate);
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else {
          alert("Invalid admin credentials");
        }
      } else if (role === "employee") {
        const validEmployee = employeeCredentials.find(
          (emp) => emp.joiningDate === joiningDate && emp.password === password
        );
        if (validEmployee) {
          localStorage.setItem("loggedInUser", joiningDate);
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
        {role === "employee" ? (
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
        ) : (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              placeholder="Enter your username"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              type="text"
              required
            />
          </div>
        )}
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
        <button type="button" onClick={() => navigate('/register')} style={{marginLeft: '10px'}}>
          Register
        </button>
      </form>
    </div>
  );
}
