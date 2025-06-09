import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';

import '../EmployeeDashboardStyles.css';

const projectProgressData = [
  { name: 'Week 1', uv: 400 },
  { name: 'Week 2', uv: 300 },
  { name: 'Week 3', uv: 500 },
  { name: 'Week 4', uv: 200 },
  { name: 'Week 5', uv: 278 },
  { name: 'Week 6', uv: 189 },
];

const teamProgressData = [
  { name: 'Customer', value: 4283 },
  { name: 'Additions', value: 297 },
];

const performanceData = [
  { name: '10', uv: 400 },
  { name: '31', uv: 300 },
  { name: '28', uv: 500 },
  { name: '39', uv: 200 },
  { name: '24', uv: 278 },
  { name: '31', uv: 189 },
];

const barChartData = [
  { name: 'Mo', uv: 200, pv: 240 },
  { name: 'Tu', uv: 300, pv: 139 },
  { name: 'We', uv: 250, pv: 980 },
  { name: 'Th', uv: 278, pv: 390 },
  { name: 'Fr', uv: 189, pv: 480 },
  { name: 'Sa', uv: 239, pv: 380 },
  { name: 'Su', uv: 349, pv: 430 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        if (data.success) {
          const emp = data.employees.find(e => e.user === loggedInUser);
          setEmployee(emp || null);
        } else {
          setError('Failed to load employee data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const generateCertificate = () => {
    if (!employee) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Internship Certificate', 105, 30, null, null, 'center');
    doc.setFontSize(16);
    doc.text(`This is to certify that ${employee.name}`, 20, 60);
    doc.text(`has successfully completed the internship as a ${employee.position}.`, 20, 75);
    doc.text(`Joining Date: ${new Date(employee.joiningDate).toLocaleDateString()}`, 20, 90);
    doc.text(`Department: ${employee.department}`, 20, 105);
    doc.text('We wish them all the best in their future endeavors.', 20, 135);
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, 160);
    doc.text('Authorized Signature', 150, 160);
    doc.line(140, 165, 190, 165); // signature line
    return doc;
  };

  const generatePreview = () => {
    if (!employee) return;
    setShowPreview(true);
  };

  const handleDownloadClick = () => {
    if (!employee) return;
    const doc = generateCertificate();
    doc.save(`${employee.name}_Internship_Certificate.pdf`);
  };

  if (loading) {
    return <p>Loading employee data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!employee) {
    return <p>No employee details found. Please log in.</p>;
  }

  return (
    <div className="emp-dashboard-wrapper">
      <div className="emp-dashboard-main">
        <header className="emp-top-bar">
          <h1>Welcome {employee.name}</h1>
          <div className="emp-top-bar-icons">
            <button className="emp-btn emp-btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <main className="emp-dashboard-main-content">
          <section className="emp-employee-details-cards">
            <h3>Employee Details</h3>
            <div className="emp-employee-cards-container">
              <div className="emp-card emp-employee-card">
                <h4>Name</h4>
                <p>{employee.name}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Position</h4>
                <p>{employee.position}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Email</h4>
                <p>{employee.email}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Phone</h4>
                <p>{employee.phone}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Department</h4>
                <p>{employee.department}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Location</h4>
                <p>{employee.location}</p>
              </div>
              <div className="emp-card emp-employee-card">
                <h4>Joining Date</h4>
                <p>{new Date(employee.joiningDate).toLocaleDateString()}</p>
              </div>
            </div>
          </section>
          <section className="emp-bottom-section">
            <div className="emp-bar-chart-container">
              <h3>Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#2962ff" />
                  <Bar dataKey="pv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="emp-employee-status-table">
              <h3>Performance Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#2962ff" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="emp-charts-section">
            <section className="certificate-preview-section">
              <div className="emp-card emp-employee-card emp-certificate-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 2rem', margin:'-6px 0', maxWidth: '350px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button className="emp-btn emp-btn-secondary" onClick={generatePreview}>
                    Preview Certificate
                  </button>
                  <button className="emp-btn emp-btn-primary" onClick={handleDownloadClick}>
                    Download Internship Certificate
                  </button>
                </div>
              </div>
              <div className='Priviewcard' style={{ maxWidth: '300px', marginLeft: '20px' }}>
                {showPreview ? (
                  <div className="emp-certificate-preview" >
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Internship Certificate</h1>
                    <p style={{ fontSize: '10px', marginBottom: '10px' }}>This is to certify that</p>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>{employee.name}</p>
                    <p style={{ fontSize: '10px', marginBottom: '10px', textAlign: 'center' }}>has successfully completed the internship as a</p>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>{employee.position}</p>
                    <p style={{ fontSize: '9px', marginBottom: '5px' }}>Joining Date: <strong>{new Date(employee.joiningDate).toLocaleDateString()}</strong></p>
                    <p style={{ fontSize: '9px', marginBottom: '5px' }}>Department: <strong>{employee.department}</strong></p>
                    <p style={{ fontSize: '9px', marginTop: '15px', marginBottom: '15px' }}>We wish them all the best in their future endeavors.</p>
                    <p style={{ fontSize: '9px' }}>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
                    <p style={{ textAlign: 'right', marginTop: '30px', fontSize: '9px' }}>
                      Authorized Signature<br />
                      <span style={{ display: 'inline-block', borderBottom: '1px solid #000', width: '75px', marginTop: '3px' }}></span>
                    </p>
                  </div>
                ) : (
                  <p>Preview will be shown here</p>
                )}
              </div>
            </section>
          </section> 
        </main>
      </div>
    </div>
  );
}
