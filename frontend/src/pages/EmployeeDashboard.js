import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

import '../EmployeeDashboardStyles.css';


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
        const response = await fetch('/api/employees');
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
        <main className="emp-dashboard-main-content" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <section className="emp-employee-details-cards" style={{ flex: 1 }}>
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
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '1rem' }}>
              <button className="emp-btn emp-btn-secondary" onClick={generatePreview}>
                Preview Certificate
              </button>
              <button className="emp-btn emp-btn-primary" onClick={handleDownloadClick}>
                Download Internship Certificate
              </button>
            </div>
          </section>
          <section className="certificate-preview-section" style={{ flex: 1 }}>
            <div className='Priviewcard' style={{ maxWidth: '100%', marginLeft: '0' }}>
              {showPreview ? (
                <div className="emp-certificate-preview" >
                  <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: '22px' }}>Internship Certificate</h1>
                  <p style={{ fontSize: '14px', marginBottom: '10px' }}>This is to certify that</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{employee.name}</p>
                  <p style={{ fontSize: '14px', marginBottom: '10px' }}>has successfully completed the internship as a</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{employee.position}</p>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Joining Date: <strong>{new Date(employee.joiningDate).toLocaleDateString()}</strong></p>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Department: <strong>{employee.department}</strong></p>
                  <p style={{ fontSize: '14px', marginTop: '15px', marginBottom: '15px' }}>We wish them all the best in their future endeavors.</p>
                  <p style={{ fontSize: '14px' }}>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
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
        </main>
      </div>
    </div>
  );
}
