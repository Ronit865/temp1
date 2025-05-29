import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Tech Solutions</Link>
      </div>
      <div className="navbar-links">
        {!loggedInUser && (
          <Link to="/" className="navbar-link">Login</Link>
        )}
        {loggedInUser && role === "admin" && (
          <Link to="/admin" className="navbar-link">Admin Dashboard</Link>
        )}
        {loggedInUser && role === "employee" && (
          <Link to="/employee" className="navbar-link">Employee Dashboard</Link>
        )}
      </div>
      <div className="navbar-right">
        {loggedInUser && (
          <>
            <span className="navbar-user">Hello, {loggedInUser}</span>
            <button className="btn btn-logout navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
