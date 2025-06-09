import './styles.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Register from "./components/register";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} /> 
         <Route path="/testchart" element={<AdminDashboard />} />
         <Route path="/register" element={<Register />} />
       </Routes> 
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
