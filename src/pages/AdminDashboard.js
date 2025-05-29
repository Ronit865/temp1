import { useState } from 'react';
import '../styles.css';

const mockEmployees = [{ id: 1, username: 'Masum', name: 'Masum Deasi', position: 'Software Engineer', email: 'alice.johnson@example.com', phone: '555-1234', department: 'Engineering', location: 'New York' },
{ id: 2, username: 'Harsh', name: 'Harsh Jadhav', position: 'Product Manager', email: 'bob.smith@example.com', phone: '555-2345', department: 'Product', location: 'San Francisco' },
{ id: 3, username: 'Ronit', name: 'Ronit Dhimmar', position: 'UX Designer', email: 'charlie.brown@example.com', phone: '555-3456', department: 'Design', location: 'Boston' },
{ id: 4, username: 'Sumit', name: 'Sumit Malkani', position: 'QA Engineer', email: 'diana.prince@example.com', phone: '555-4567', department: 'Quality Assurance', location: 'Seattle' },
{ id: 5, username: 'Veer', name: 'Veer Kshatriya', position: 'DevOps Engineer', email: 'ethan.hunt@example.com', phone: '555-5678', department: 'Operations', location: 'Austin' },
{ id: 6, username: 'Jami', name: 'Jamin Mali', position: 'Security Analyst', email: 'fiona.glenanne@example.com', phone: '555-6789', department: 'Security', location: 'Chicago' },
{ id: 7, username: 'Monil', name: 'Monil Patel', position: 'Business Analyst', email: 'george.bailey@example.com', phone: '555-7890', department: 'Business', location: 'Denver' },
{ id: 8, username: 'Rahil', name: 'Rahil Patel', position: 'HR Manager', email: 'hannah.wells@example.com', phone: '555-8901', department: 'Human Resources', location: 'Miami' },
{ id: 9, username: 'Ayush', name: 'Ayush More', position: 'Technical Writer', email: 'ian.fleming@example.com', phone: '555-9012', department: 'Documentation', location: 'Portland' },
{ id: 10, username: 'Dip', name: 'Dip basopia', position: 'Marketing Specialist', email: 'jane.doe@example.com', phone: '555-0123', department: 'Marketing', location: 'Los Angeles' },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="dashboard-content">

      <aside className="sidebar">
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

      <div className="dashboard-main-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>
          <div className="employee-count-cards-container">
            <div className="employee-count-card">
              <h2>Total Employees</h2>
              <p>{mockEmployees.length}</p>
            </div>
            <div className="employee-count-card">
              <h2>Total Interns Trained</h2>
              <p>100+</p>
            </div>
          </div>
        </div>

      {selectedEmployee && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={handleCloseDetails} className="modal-close-button"><div>&#10006;</div></button>
            <h3>{selectedEmployee.name}</h3>
            <p><strong>Position:</strong> {selectedEmployee.position}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
          </div>
        </div>
      )}
    </div>

  );
}
