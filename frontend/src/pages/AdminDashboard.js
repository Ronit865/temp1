import React, { useState, useEffect } from 'react';
import '../styles.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const attendanceData = [
  { month: 'Jan', Attendance: 90 },
  { month: 'Feb', Attendance: 85 },
  { month: 'Mar', Attendance: 88 },
  { month: 'Apr', Attendance: 92 },
  { month: 'May', Attendance: 87 },
  { month: 'Jun', Attendance: 90 },
];

const departmentData = [
  { name: 'Engineering', value: 3 },
  { name: 'Product', value: 1 },
  { name: 'Design', value: 1 },
  { name: 'QA', value: 1 },
  { name: 'Operations', value: 1 },
  { name: 'Security', value: 1 },
  { name: 'Business', value: 1 },
  { name: 'HR', value: 1 },
  { name: 'Documentation', value: 1 },
  { name: 'Marketing', value: 1 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb', '#d88884', '#84d8d8'];

const recentActivities = [
  { id: 1, activity: 'Employee Masum promoted to Senior Engineer', time: '2 hours ago' },
  { id: 2, activity: 'New hire: Ayush More joined Documentation team', time: '1 day ago' },
  { id: 3, activity: 'Payroll processed for May 2024', time: '3 days ago' },
  { id: 4, activity: 'Leave request approved for Rahil Patel', time: '5 days ago' },
];

const employeeStatus = [
  { id: 1, name: 'Masum Desai', position: 'Software Engineer', status: 'Active' },
  { id: 2, name: 'Harsh Jadhav', position: 'Product Manager', status: 'Active' },
  { id: 3, name: 'Ronit Dhimmar', position: 'UX Designer', status: 'On Leave' },
  { id: 4, name: 'Sumit Malkani', position: 'QA Engineer', status: 'Active' },
  { id: 5, name: 'Veer Kshatriya', position: 'DevOps Engineer', status: 'Active' },
];

import Register from '../components/register';
import Add from '../components/add';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleRemoveEmployee = async () => {
    if (!selectedEmployee) {
      alert('Please select an employee to remove.');
      return;
    }

    if (!window.confirm(`Are you sure you want to remove ${selectedEmployee.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        alert('Employee removed successfully.');
        // Update employees state to remove deleted employee
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== selectedEmployee._id));
        setSelectedEmployee(null);
      } else {
        alert(`Failed to remove employee: ${data.message}`);
      }
    } catch (error) {
      console.error('Error removing employee:', error);
      alert('Error removing employee. Please try again.');
    }
  };

  useEffect(() => {
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
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openRegisterPopup = (employee = null) => {
    setEmployeeToEdit(employee);
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
    <div className="dashboard-content">

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle-button" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
        <div className="sidebar-header">
          {isSidebarOpen ? (
            <>
              <div className="sidebar-employee-label">Employees</div>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sidebar-search-input"
              />
              <div className="sidebar-employee-list">
                {filteredEmployees.length > 0 ? (
                  <ul>
                    {filteredEmployees.map(employee => (
                      <li
                        key={employee._id}
                        onClick={() => handleEmployeeClick(employee)}
                        className="sidebar-employee-item"
                      >
                        {employee.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No employees found.</p>
                )}
              </div>
               <button
                className="add-employee-button"
                onClick={openAddPopup}
                aria-label="Add Employee"
              >
                Add Employee
              </button>
            </>
          ) : (
            null
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main-content">

        {/* Top Bar */}
        <header className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="top-bar-left" style={{ color: '#2962ff', fontWeight: '600', fontSize: '1.5rem' }}>
            Dashboard
          </div>
          <div className="top-bar-right">
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="User Avatar" className="user-avatar" />
              <span className="user-name">Admin</span>
              <button className="logout-button" onClick={() => window.location.href = 'https://6g4q637q-3000.inc1.devtunnels.ms/'} style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <section className="metrics-cards">
          <div className="metric-card pink">
            <h3>Total Employees</h3>
            <p>{employees.length}</p>
          </div>
          <div className="metric-card purple">
            <h3>Attendance Rate</h3>
            <p>89%</p>
          </div>
          <div className="metric-card blue">
            <h3>Leave Requests</h3>
            <p>12</p>
          </div>
          <div className="metric-card orange">
            <h3>Payroll Status</h3>
            <p>Processed</p>
          </div>
        </section>

        {/* Charts Section */}
        <section className="charts-section">
          <div className="line-chart-container">
            <h3>Monthly Attendance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pie-chart-container">
            <h3>Department Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent Activities and Employee Status */}
        <section className="bottom-section">
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            <ul>
              {recentActivities.map(activity => (
                <li key={activity.id}>
                  <strong>{activity.activity}</strong>
                  <br />
                  <small>{activity.time}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="employee-status-table">
            <h3>Employee Status</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeStatus.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.position}</td>
                    <td>{emp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

       

        {/* Employee Details Modal */} 
        {selectedEmployee && (
          <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={handleCloseDetails} className="modal-close-button"><div>&#10006;</div></button>
              <h3>{selectedEmployee.name}</h3>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Location:</strong> {selectedEmployee.location}</p>
              <p><strong>Joining Date:</strong> {selectedEmployee.joiningDate}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                <button 
                  onClick={() => {
                    openRegisterPopup(selectedEmployee);
                    setSelectedEmployee(null);
                  }} 
                  className="modal-edit-button"
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button
                  onClick={handleRemoveEmployee}
                  className="modal-remove-button"
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Register Popup Modal */}
        {isRegisterPopupOpen && (
          <div className="modal-overlay" onClick={closeAddPopup}>
            <div className="modal-content popup-card" onClick={e => e.stopPropagation()}>
            <button onClick={closeAddPopup} className="modal-close-button"><div>&#10006;</div></button>
            <Register onClose={closeAddPopup} />
          </div>
          </div>
        )}
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