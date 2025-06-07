import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const adminCredentials = {
  user: "Appi000",
  joiningDate: "2016-08-12"
};

const employeeCredentials = [
  { user: 'Appi001', joiningDate: "2022-08-08" },
  { user: 'Appi002', joiningDate: "2021-06-20" },
  { user: 'Appi003', joiningDate: "2020-11-05" },
  { user: 'Appi004', joiningDate: "2019-08-12" },
  { user: 'Appi005', joiningDate: "2023-03-01" },
  { user: 'Appi006', joiningDate: "2022-07-18" },
  { user: 'Appi007', joiningDate: "2021-12-30" },
  { user: 'Appi008', joiningDate: "2020-04-25" },
  { user: 'Appi009', joiningDate: "2019-09-10" },
  { user: 'Appi010', joiningDate: "2023-02-14" }
];

export default function Login() {
  const [user, setUser] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (user && joiningDate) {
      if (user === adminCredentials.user && joiningDate === adminCredentials.joiningDate) {
        localStorage.setItem("loggedInUser", user);
        navigate("/admin");
      } else {
        const validEmployee = employeeCredentials.find(
          (emp) => emp.user === user && emp.joiningDate === joiningDate
        );
        if (validEmployee) {
          localStorage.setItem("loggedInUser", user);
          navigate("/employee");
        } else {
          alert("Invalid credentials");
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
          <label htmlFor="user">User</label>
          <input
            id="user"
            placeholder="Enter your user ID"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
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
        
        <div className="button-group">
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
