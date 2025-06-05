import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';
import '../styles.css';
import '../EmployeeDashboardStyles.css';

const mockEmployees = [
  { id: 2, joiningDate: "2021-06-20", name: 'Harsh Jadhav', position: 'Product Manager', email: 'bob.smith@example.com', phone: '555-2345', department: 'Product', location: 'San Francisco' },
  { id: 1, joiningDate: "2022-08-08", name: 'Masum Desai', position: 'Software Engineer', email: 'Masum.Desai@Gmail.com', phone: '8320331941', department: 'Engineering', location: 'Navsari' },
  { id: 3, joiningDate: "2020-11-05", name: 'Ronit Dhimmar', position: 'UX Designer', email: 'charlie.brown@example.com', phone: '555-3456', department: 'Design', location: 'Boston' },
  { id: 4, joiningDate: "2019-08-12", name: 'Sumit Malkani', position: 'QA Engineer', email: 'diana.prince@example.com', phone: '555-4567', department: 'Quality Assurance', location: 'Seattle' },
  { id: 5, joiningDate: "2023-03-01", name: 'Veer Kshatriya', position: 'DevOps Engineer', email: 'ethan.hunt@example.com', phone: '555-5678', department: 'Operations', location: 'Austin' },
  { id: 6, joiningDate: "2022-07-18", name: 'Jamin Mali', position: 'Security Analyst', email: 'fiona.glenanne@example.com', phone: '555-6789', department: 'Security', location: 'Chicago' },
  { id: 7, joiningDate: "2021-12-30", name: 'Monil Patel', position: 'Business Analyst', email: 'george.bailey@example.com', phone: '555-7890', department: 'Business', location: 'Denver' },
  { id: 8, joiningDate: "2020-04-25", name: 'Rahil Patel', position: 'HR Manager', email: 'hannah.wells@example.com', phone: '555-8901', department: 'Human Resources', location: 'Miami' },
  { id: 9, joiningDate: "2019-09-10", name: 'Ayush More', position: 'Technical Writer', email: 'ian.fleming@example.com', phone: '555-9012', department: 'Documentation', location: 'Portland' },
  { id: 10, joiningDate: "2023-02-14", name: 'Dip basopia', position: 'Marketing Specialist', email: 'jane.doe@example.com', phone: '555-0123', department: 'Marketing', location: 'Los Angeles' },
];

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
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const role = localStorage.getItem('role');
    if (!loggedInUser || role !== 'employee') {
      navigate('/');
      return;
    }

    // Get new employees from localStorage
    const newEmployees = JSON.parse(localStorage.getItem("newEmployees")) || [];

    // Merge mockEmployees and newEmployees
    const allEmployees = [...mockEmployees, ...newEmployees];

    const emp = allEmployees.find(e => e.joiningDate === loggedInUser);
    setEmployee(emp || null);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
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
    doc.text(`Joining Date: ${employee.joiningDate}`, 20, 90);
    doc.text(`Department: ${employee.department}`, 20, 105);
    doc.text('We wish them all the best in their future endeavors.', 20, 135);
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, 160);
    doc.text('Authorized Signature', 150, 160);
    doc.line(140, 165, 190, 165); // signature line
    return doc;
  };

  const [showPreview, setShowPreview] = useState(false);

  const generatePreview = () => {
    if (!employee) return;
    setShowPreview(true);
  };

  const handleDownloadClick = () => {
    if (!employee) return;
    const doc = generateCertificate();
    doc.save(`${employee.name}_Internship_Certificate.pdf`);
  };

  if (!employee) {
    return <p>No employee details found. Please log in.</p>;
  }

  return (
    <div className="dashboard-wrapper">
      {/* <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">🔧</div>
          <h2>Employee Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Operations</li>
            <li>Projects</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-primary">Teamland</button>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </aside> */}
      <div className="dashboard-main">
        <header className="top-bar">
          <h1>Welcome {employee.name}</h1>
          <div className="top-bar-icons">
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <main className="dashboard-main-content">


          <section className="employee-details-cards">
            <h3>Employee Details</h3>
            <div className="employee-cards-container">
              <div className="card employee-card">
                <h4>Name</h4>
                <p>{employee.name}</p>
              </div>
              <div className="card employee-card">
                <h4>Position</h4>
                <p>{employee.position}</p>
              </div>
              <div className="card employee-card">
                <h4>Email</h4>
                <p>{employee.email}</p>
              </div>
              <div className="card employee-card">
                <h4>Phone</h4>
                <p>{employee.phone}</p>
              </div>
              <div className="card employee-card">
                <h4>Department</h4>
                <p>{employee.department}</p>
              </div>
              <div className="card employee-card">
                <h4>Location</h4>
                <p>{employee.location}</p>
              </div>
              <div className="card employee-card">
                <h4>Joining Date</h4>
                <p>{employee.joiningDate}</p>
              </div>
            </div>
          </section>
          <section className="charts-section">
            {/* Certificate preview card moved outside employee details */}
            <section className="certificate-preview-section">
              <div className="card employee-card certificate-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 12rem', margin:'-6px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button className="btn btn-secondary" onClick={generatePreview}>
                    Preview Certificate
                  </button>
                  <button className="btn btn-primary" onClick={handleDownloadClick}>
                    Download Internship Certificate
                  </button>
                </div>
              </div>
              <div className='Priviewcard'>

                {showPreview ? (
                  <div className="certificate-preview" >
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Internship Certificate</h1>
                    <p style={{ fontSize: '10px', marginBottom: '10px' }}>This is to certify that</p>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>{employee.name}</p>
                    <p style={{ fontSize: '10px', marginBottom: '10px', textAlign: 'center' }}>has successfully completed the internship as a</p>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>{employee.position}</p>
                    <p style={{ fontSize: '9px', marginBottom: '5px' }}>Joining Date: <strong>{employee.joiningDate}</strong></p>
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
          <section className="bottom-section">
            <div className="bar-chart-container">
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
            <div className="employee-status-table">
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
        </main>
      </div>
    </div>
  );
}
