import React, { useState, useEffect } from 'react';
import '../styles.css';
import Register from '../components/register';
import Add from '../components/add';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleRemoveEmployee = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      alert('User not found');
      return;
    }

    console.log('Attempting to delete user:', user);

    if (!window.confirm(`Are you sure you want to remove ${user.username}?`)) {
      return;
    }

    try {
      // Use the employee deletion endpoint since we're working with employee data
      console.log('Making DELETE request to:', `/api/employees/${user.dbId}`);
      
      const response = await fetch(`/api/employees/${user.dbId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Received non-JSON response:', textResponse);
        alert('Server returned an invalid response. Check if the backend is running properly.');
        return;
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
        alert('User removed successfully from database.');
        // Refresh the users list
        window.location.reload();
      } else {
        alert(`Failed to remove user: ${data.message}`);
      }
    } catch (error) {
      console.error('Error removing user:', error);
      alert('Error removing user. Please check if the backend server is running on port 5000.');
    }
  };

  useEffect(() => {
    // Add class to body for admin dashboard styles
    document.body.classList.add('admin-dashboard-active');
    
    async function fetchEmployees() {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        console.log('Fetched employees data:', data);
        if (data.success) {
          setEmployees(data.employees);
        } else {
          console.error('Failed to fetch employees:', data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    async function fetchUsers() {
      try {
        // Fetch both employees and users to get complete data
        const [employeeResponse, userResponse] = await Promise.all([
          fetch('/api/employees'),
          fetch('/api/users')
        ]);
        
        const employeeData = await employeeResponse.json();
        const userData = await userResponse.json();
        
        console.log('Fetched employees data:', employeeData);
        console.log('Fetched users data:', userData);
        
        if (employeeData.success && userData.success) {
          // Create a map of users for quick lookup
          const userMap = {};
          userData.users.forEach(user => {
            userMap[user.user] = user.role || 'employee'; // Default to employee if no role specified
          });
          
          // Transform the employee data to match our UI requirements
          const transformedEmployees = employeeData.employees.map((employee, index) => ({
            id: index + 1,
            username: employee.name || employee.user || 'Unknown',
            email: employee.email || `${employee.user}@gmail.com`,
            city: employee.location || 'Unknown',
            phone: employee.phone || 'N/A',
            department: employee.department || 'N/A',
            role: userMap[employee.user] === 'admin' ? 'Admin' : 
                  userMap[employee.user] === 'employee' ? 'Employee' : 'User', // Handle admin, employee, and default roles
            dbId: employee._id, // Store the actual MongoDB ObjectId for API calls
            dbUsername: employee.user, // Store username as fallback
            hasEmployeeRecord: true
          }));
          
          // Add users who don't have employee records (like admin-only users)
          const employeeUsernames = new Set(employeeData.employees.map(emp => emp.user));
          const adminOnlyUsers = userData.users
            .filter(user => !employeeUsernames.has(user.user) && user.role === 'admin')
            .map((user, index) => ({
              id: transformedEmployees.length + index + 1,
              username: user.user,
              email: `${user.user}@gmail.com`,
              city: 'Admin',
              phone: 'N/A',
              department: 'Administration',
              role: 'Admin',
              dbId: null,
              dbUsername: user.user,
              hasEmployeeRecord: false
            }));
          
          const allUsers = [...transformedEmployees, ...adminOnlyUsers];
          setUsers(allUsers);
        } else {
          console.error('Failed to fetch data:', employeeData.message || userData.message);
          // Fallback to hardcoded data if fetch fails
          setUsers([
            { id: 1, username: 'Admin', email: 'rajdhimmar4@gmail.com', city: 'Ahmedabad', age: 25, language: 'english', role: 'Admin', dbId: 'fallback1', dbUsername: 'Admin' },
            { id: 2, username: 'Masum', email: 'masumdesai88@gmail.com', city: 'Ahmedabad', age: 20, language: 'English', role: 'User', dbId: 'fallback2', dbUsername: 'Masum' },
            { id: 3, username: 'Manthan', email: 'manthan@gmail.com', city: 'Ahmedabad', age: 5, language: 'Gujarati', role: 'User', dbId: 'fallback3', dbUsername: 'Manthan' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to hardcoded data if fetch fails
        setUsers([
          { id: 1, username: 'Admin', email: 'rajdhimmar4@gmail.com', city: 'Ahmedabad', age: 25, language: 'english', role: 'Admin', dbId: 'fallback1', dbUsername: 'Admin' },
          { id: 2, username: 'Masum', email: 'masumdesai88@gmail.com', city: 'Ahmedabad', age: 20, language: 'English', role: 'User', dbId: 'fallback2', dbUsername: 'Masum' },
          { id: 3, username: 'Manthan', email: 'manthan@gmail.com', city: 'Ahmedabad', age: 5, language: 'Gujarati', role: 'User', dbId: 'fallback3', dbUsername: 'Manthan' }
        ]);
      }
    }

    fetchEmployees();
    fetchUsers();

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('admin-dashboard-active');
    };
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  const adminUsers = users.filter(user => user.role === 'Admin');
  const regularUsers = users.filter(user => user.role === 'Employee');

  const openRegisterPopup = async (user = null) => {
    if (user && user.dbId) {
      try {
        // Fetch the full employee data for editing
        const response = await fetch(`/api/employees`);
        const data = await response.json();
        if (data.success) {
          const fullEmployee = data.employees.find(emp => emp._id === user.dbId);
          setEmployeeToEdit(fullEmployee);
        } else {
          setEmployeeToEdit(null);
        }
      } catch (error) {
        console.error('Error fetching employee for edit:', error);
        setEmployeeToEdit(null);
      }
    } else {
      setEmployeeToEdit(null);
    }
    setIsRegisterPopupOpen(true);
  };

  const closeRegisterPopup = () => {
    setEmployeeToEdit(null);
    setIsRegisterPopupOpen(false);
  };
  const openAddPopup = (employee = null) => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <nav className="admin-navbar">
        <div className="navbar-left">
          <span className="navbar-logo">Admin Panel</span>
        </div>
        <div className="navbar-center">
          <div className="navbar-links">
            {/* <a href="#" className="navbar-link">Dashboard</a>
            <a href="#" className="navbar-link">Admin Panel</a> */}
          </div>
        </div>
        <div className="navbar-right">
          {/* <span className="navbar-user">Welcome, Admin</span> */}
          <button 
            className="navbar-logout" 
            onClick={() => window.location.href = 'https://6g4q637q-3000.inc1.devtunnels.ms/'}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Dashboard Title */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        {/* Metrics Cards */}
        <section className="admin-metrics-cards">
          <div className="admin-metric-card blue">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="admin-metric-card green">
            <h3>Admin Users</h3>
            <p>{adminUsers.length}</p>
          </div>
          <div className="admin-metric-card purple">
            <h3>Employee Users</h3>
            <p>{regularUsers.length}</p>
          </div>
        </section>

        {/* User Management Section */}
        <section className="user-management-section">
          <div className="user-management-header">
            <h2>User Management</h2>
            <button className="add-new-user-btn" onClick={openAddPopup}>
              Add New User
            </button>
          </div>

          {/* User Table */}
          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>CITY</th>
                  <th>MOBILE NUMBER</th>
                  <th>DEPARTMENT</th>
                  <th>ROLE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-avatar-cell">
                        <div className="user-avatar-circle" style={{ backgroundColor: user.username === 'Admin' ? '#6366f1' : '#8b5cf6' }}>
                          {user.username.charAt(0)}
                        </div>
                        {user.username}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.phone}</td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit" onClick={() => openRegisterPopup(user)}>
                          Edit
                        </button>
                        <button className="action-btn delete" onClick={() => handleRemoveEmployee(user.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Register Popup Modal */}
        {isRegisterPopupOpen && (
          <div className="modal-overlay" onClick={closeRegisterPopup}>
            <div className="modal-content popup-card" onClick={e => e.stopPropagation()}>
              <button onClick={closeRegisterPopup} className="modal-close-button"><div>&#10006;</div></button>
              <Register onClose={closeRegisterPopup} employee={employeeToEdit} />
            </div>
          </div>
        )}
        {/* Add Popup Modal */}
        {isAddPopupOpen && (
          <div className="modal-overlay" onClick={closeAddPopup}>
            <div className="modal-content popup-card" onClick={e => e.stopPropagation()}>
              <button onClick={closeAddPopup} className="modal-close-button"><div>&#10006;</div></button>
              <Add onClose={closeAddPopup} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};