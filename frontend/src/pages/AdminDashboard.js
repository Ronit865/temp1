import React, { useState } from 'react';
import '../styles.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaFileAlt, FaMoneyCheckAlt, FaChartBar, FaCog } from 'react-icons/fa';

const mockEmployees = [
  { id: 1, username: 'Masum', name: 'Masum Deasi', position: 'Software Engineer', email: 'masum.deasi@gmail.com', phone: '+91 9123456789', department: 'Engineering', location: 'Mumbai', joiningDate: '2020-01-15' },
  { id: 2, username: 'Harsh', name: 'Harsh Jadhav', position: 'Product Manager', email: 'harsh.jadhav@gmail.com', phone: '+91 9234567890', department: 'Product', location: 'Delhi', joiningDate: '2019-03-22' },
  { id: 3, username: 'Ronit', name: 'Ronit Dhimmar', position: 'UX Designer', email: 'ronit.dhimmar@gmail.com', phone: '+91 9345678901', department: 'Design', location: 'Bangalore', joiningDate: '2021-07-10' },
  { id: 4, username: 'Sumit', name: 'Sumit Malkani', position: 'QA Engineer', email: 'sumit.malkani@gmail.com', phone: '+91 9456789012', department: 'Quality Assurance', location: 'Chennai', joiningDate: '2018-11-05' },
  { id: 5, username: 'Veer', name: 'Veer Kshatriya', position: 'DevOps Engineer', email: 'veer.kshatriya@gmail.com', phone: '+91 9567890123', department: 'Operations', location: 'Hyderabad', joiningDate: '2020-06-18' },
  { id: 6, username: 'Jami', name: 'Jamin Mali', position: 'Security Analyst', email: 'jamin.mali@gmail.com', phone: '+91 9678901234', department: 'Security', location: 'Pune', joiningDate: '2019-09-30' },
  { id: 7, username: 'Monil', name: 'Monil Patel', position: 'Business Analyst', email: 'monil.patel@gmail.com', phone: '+91 9789012345', department: 'Business', location: 'Ahmedabad', joiningDate: '2021-01-12' },
  { id: 8, username: 'Rahil', name: 'Rahil Patel', position: 'HR Manager', email: 'rahil.patel@gmail.com', phone: '+91 9890123456', department: 'Human Resources', location: 'Kolkata', joiningDate: '2017-04-25' },
  { id: 9, username: 'Ayush', name: 'Ayush More', position: 'Technical Writer', email: 'ayush.more@gmail.com', phone: '+91 9901234567', department: 'Documentation', location: 'Surat', joiningDate: '2020-10-01' },
  { id: 10, username: 'Dip', name: 'Dip basopia', position: 'Marketing Specialist', email: 'dip.basopia@gmail.com', phone: '+91 9012345678', department: 'Marketing', location: 'Jaipur', joiningDate: '2018-08-14' },
];

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
  { id: 1, name: 'Masum Deasi', position: 'Software Engineer', status: 'Active' },
  { id: 2, name: 'Harsh Jadhav', position: 'Product Manager', status: 'Active' },
  { id: 3, name: 'Ronit Dhimmar', position: 'UX Designer', status: 'On Leave' },
  { id: 4, name: 'Sumit Malkani', position: 'QA Engineer', status: 'Active' },
  { id: 5, name: 'Veer Kshatriya', position: 'DevOps Engineer', status: 'Active' },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredEmployees = mockEmployees.filter(employee =>
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

  return (
    <div className="dashboard-content">

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? '<<' : '>>'}
        </button>
        <div className="sidebar-header">
          {isSidebarOpen ? <h2>Admin Dashboard</h2> : <FaTachometerAlt size={24} color="#2962ff" />}
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <FaTachometerAlt size={20} color="#4c1d95" />
              {isSidebarOpen && 'Dashboard'}
            </li>
            <li>
              <FaUsers size={20} color="#4c1d95" />
              {isSidebarOpen && 'Employees'}
            </li>
            <li>
              <FaCalendarCheck size={20} color="#4c1d95" />
              {isSidebarOpen && 'Attendance'}
            </li>
            <li>
              <FaFileAlt size={20} color="#4c1d95" />
              {isSidebarOpen && 'Leave Requests'}
            </li>
            <li>
              <FaMoneyCheckAlt size={20} color="#4c1d95" />
              {isSidebarOpen && 'Payroll'}
            </li>
            <li>
              <FaChartBar size={20} color="#4c1d95" />
              {isSidebarOpen && 'Reports'}
            </li>
            <li>
              <FaCog size={20} color="#4c1d95" />
              {isSidebarOpen && 'Settings'}
            </li>
          </ul>
        </nav>
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
              <img src="https://imgs.search.brave.com/3LNY8EAoZ9NxPI12gLrIcVphojpIvtU_bI9qLxDnUoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Ymx1ZS1jaXJjbGUt/d2l0aC13aGl0ZS11/c2VyXzc4MzcwLTQ3/MDcuanBnP3NlbXQ9/YWlzX2h5YnJyaWQmdz03NDA" alt="User Avatar" className="user-avatar" />
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <section className="metrics-cards">
          <div className="metric-card pink">
            <h3>Total Employees</h3>
            <p>{mockEmployees.length}</p>
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

        {/* Employee Search Sidebar */}
        <aside className={`employee-search-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="sidebar-toggle-button" onClick={toggleSidebar}>
            {isSidebarOpen ? '<<' : '>>'}
          </button>
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon-right" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="#2962ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <div className="employee-names-box">
            <ul>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <li
                    key={employee.id}
                    onClick={() => handleEmployeeClick(employee)}
                    style={{ cursor: 'pointer', color: '#4c1d95', fontWeight: '600' }}
                  >
                    {employee.name}
                  </li>
                ))
              ) : (
                <li>No employees found.</li>
              )}
            </ul>
          </div>
        </aside>

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
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
