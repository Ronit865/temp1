import { useState } from 'react';
import '../styles.css';

const mockEmployees = [
  { id: 1, name: 'Alice Johnson', position: 'Software Engineer', email: 'alice.johnson@example.com' },
  { id: 2, name: 'Bob Smith', position: 'Product Manager', email: 'bob.smith@example.com' },
  { id: 3, name: 'Charlie Brown', position: 'UX Designer', email: 'charlie.brown@example.com' },
  { id: 4, name: 'Diana Prince', position: 'QA Engineer', email: 'diana.prince@example.com' },
  { id: 5, name: 'Ethan Hunt', position: 'DevOps Engineer', email: 'ethan.hunt@example.com' },
  { id: 6, name: 'Fiona Glenanne', position: 'Security Analyst', email: 'fiona.glenanne@example.com' },
  { id: 7, name: 'George Bailey', position: 'Business Analyst', email: 'george.bailey@example.com' },
  { id: 8, name: 'Hannah Wells', position: 'HR Manager', email: 'hannah.wells@example.com' },
  { id: 9, name: 'Ian Fleming', position: 'Technical Writer', email: 'ian.fleming@example.com' },
  { id: 10, name: 'Jane Doe', position: 'Marketing Specialist', email: 'jane.doe@example.com' },
];

export default function EmployeeDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="employee-names-box">
        <ul>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <li key={employee.id}>{employee.name}</li>
            ))
          ) : (
            <li>No employees found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
