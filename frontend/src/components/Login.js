import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

export default function Login() {
  const [user, setUser] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user || !joiningDate) {
      alert("Enter valid credentials");
      return;
    }

    setLoading(true);

    console.log('Sending login request with user:', user, 'joiningDate:', joiningDate);

    // Normalize joiningDate to yyyy-mm-dd format
    const normalizedJoiningDate = new Date(joiningDate).toISOString().split('T')[0];
    console.log('Normalized joiningDate:', normalizedJoiningDate);

    try {
      const response = await fetch('https://z59g0pdh-5000.inc1.devtunnels.ms/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, joiningDate: normalizedJoiningDate })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('loggedInUser', user);

        if (data.role === 'admin') {
          navigate("/admin");
        } else if (data.role === 'employee') {
          navigate("/employee");
        } else {
          alert("Unknown user role");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
}
