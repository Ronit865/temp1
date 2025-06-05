import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '../styles.css';

const mockEmployees = [
  { id: 1, username: 'Masum', name: 'Masum Deasi', position: 'Software Engineer', email: 'Masum.Desai@Gmail.com', phone: '8320331941', department: 'Engineering', location: 'Navsari' },
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

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const role = localStorage.getItem('role');
    if (!loggedInUser || role !== 'employee') {
      navigate('/');
      return;
    }
    const emp = mockEmployees.find(e => e.username === loggedInUser);
    setEmployee(emp || null);
  }, [navigate]);

  const generatePDF = () => {
    if (!employee) return;
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 60;
    let y = 60;

    // Draw border
    doc.setDrawColor('#003366');
    doc.setLineWidth(3);
    doc.rect(20, 20, pageWidth - 40, doc.internal.pageSize.getHeight() - 40);

    // Company Name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#003366');
    doc.text('Tech Solutions Inc.', pageWidth / 2, y, { align: 'center' });
    y += 50;

    // Logo placeholder (circle)
    doc.setDrawColor('#003366');
    doc.setFillColor('#003366');
    doc.circle(pageWidth / 2, y, 30, 'F');
    y += 60;

    // Certificate Title
    doc.setFontSize(28);
    doc.setTextColor('#000');
    doc.text('Internship Certificate', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Horizontal line
    doc.setDrawColor('#003366');
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 30;

    // Body text
    doc.setFontSize(14);
    doc.setFont('times', 'normal');
    const bodyText = `This is to certify that ${employee.name}, holding the position of ${employee.position}, has successfully completed an internship at Tech Solutions Inc. from June 1, 2023 to August 31, 2023.`;

    const splitBodyText = doc.splitTextToSize(bodyText, pageWidth - 2 * margin);
    doc.text(splitBodyText, pageWidth / 2, y, { align: 'center' });
    y += splitBodyText.length * 18 + 20;

    // Achievements and skills
    const achievements = [
      'During the internship, the intern demonstrated excellent technical skills, teamwork, and professionalism.',
      'Key achievements include contributing to project development, participating in team meetings, and delivering presentations.'
    ];
    achievements.forEach(line => {
      const splitLine = doc.splitTextToSize(line, pageWidth - 2 * margin);
      doc.text(splitLine, pageWidth / 2, y, { align: 'center' });
      y += splitLine.length * 18 + 10;
    });

    y += 20;

    // Supervisor info (left aligned)
    doc.setFontSize(14);
    doc.text('Supervisor:', margin, y);
    y += 20;
    doc.text('John Manager', margin + 20, y);
    y += 20;
    doc.text('Title: Senior Project Manager', margin + 20, y);
    y += 40;

    // Date and signature (centered)
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, pageWidth / 2, y, { align: 'center' });
    y += 30;
    doc.text('_________________________', pageWidth / 2, y, { align: 'center' });
    y += 20;
    doc.text('Authorized Signature', pageWidth / 2, y, { align: 'center' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor('#666');
    doc.text('Tech Solutions Inc. | 1234 Innovation Drive, Tech City | contact@techsolutions.com', pageWidth / 2, doc.internal.pageSize.getHeight() - 30, { align: 'center' });

    doc.save(`${employee.username}_internship_certificate.pdf`);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (!employee) {
    return (
      <div className="page-container">
        <header className="page-header">
          <h1>Employee Dashboard</h1>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </header>
        <main className="page-main">
          <p>No employee details found. Please log in.</p>
        </main>
        <footer className="page-footer">
          <p>© 2024 Tech Solutions Inc.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Employee Dashboard</h1>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </header>
      <main className="page-main">
        <section className="employee-details">
          <div className="detail-row"><span className="label">Name:</span> <span>{employee.name}</span></div>
          <div className="detail-row"><span className="label">Position:</span> <span>{employee.position}</span></div>
          <div className="detail-row"><span className="label">Email:</span> <span>{employee.email}</span></div>
          <div className="detail-row"><span className="label">Phone:</span> <span>{employee.phone}</span></div>
          <div className="detail-row"><span className="label">Department:</span> <span>{employee.department}</span></div>
          <div className="detail-row"><span className="label">Location:</span> <span>{employee.location}</span></div>
        </section>
        <div className="button-group">
          <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
        </div>
      </main>
      <footer className="page-footer">
        <p>© 2024 Tech Solutions Inc.</p>
      </footer>
    </div>
  );
}
