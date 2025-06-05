import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '../styles.css';

const mockEmployees = [
  { id: 2, joiningDate: "2021-06-20", name: 'Harsh Jadhav', position: 'Product Manager', email: 'bob.smith@example.com', phone: '555-2345', department: 'Product', location: 'San Francisco' },
  { id: 1, joiningDate: "2022-08-08", name: 'Masum Deasi', position: 'Software Engineer', email: 'Masum.Desai@Gmail.com', phone: '8320331941', department: 'Engineering', location: 'Navsari' },
  { id: 3, joiningDate: "2020-11-05", name: 'Ronit Dhimmar', position: 'UX Designer', email: 'charlie.brown@example.com', phone: '555-3456', department: 'Design', location: 'Boston' },
  { id: 4, joiningDate: "2019-08-12", name: 'Sumit Malkani', position: 'QA Engineer', email: 'diana.prince@example.com', phone: '555-4567', department: 'Quality Assurance', location: 'Seattle' },
  { id: 5, joiningDate: "2023-03-01",name: 'Veer Kshatriya', position: 'DevOps Engineer', email: 'ethan.hunt@example.com', phone: '555-5678', department: 'Operations', location: 'Austin' },
  { id: 6, joiningDate: "2022-07-18",name: 'Jamin Mali', position: 'Security Analyst', email: 'fiona.glenanne@example.com', phone: '555-6789', department: 'Security', location: 'Chicago' },
  { id: 7, joiningDate: "2021-12-30", name: 'Monil Patel', position: 'Business Analyst', email: 'george.bailey@example.com', phone: '555-7890', department: 'Business', location: 'Denver' },
  { id: 8, joiningDate: "2020-04-25", name: 'Rahil Patel', position: 'HR Manager', email: 'hannah.wells@example.com', phone: '555-8901', department: 'Human Resources', location: 'Miami' },
  { id: 9, joiningDate: "2019-09-10", name: 'Ayush More', position: 'Technical Writer', email: 'ian.fleming@example.com', phone: '555-9012', department: 'Documentation', location: 'Portland' },
  { id: 10, joiningDate: "2023-02-14",name: 'Dip basopia', position: 'Marketing Specialist', email: 'jane.doe@example.com', phone: '555-0123', department: 'Marketing', location: 'Los Angeles' },
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
    const emp = mockEmployees.find(e => e.joiningDate === loggedInUser);
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

  return (
    <div className="page-container">
      <main className="page-main">
        {employee ? (
          <section className="employee-full-display">
            <div className="employee-details-no-card">
              <h2>{employee.name}</h2>
              <div className="employee-details-row-no-card">
                <span><strong>Position:</strong> {employee.position}</span>
                <span><strong>Email:</strong> {employee.email}</span>
              </div>
              <div className="employee-details-row-no-card">
                <span><strong>Phone:</strong> {employee.phone}</span>
                <span><strong>Department:</strong> {employee.department}</span>
              </div>
              <div className="employee-details-row-no-card">
                <span><strong>Location:</strong> {employee.location}</span>
              </div>
              <button className="btn btn-primary" onClick={() => {
                generatePDF();
              }}>Download PDF</button>
            </div>
          </section>
        ) : (
          <p>No employee details found. Please log in.</p>
        )}
      </main>
    </div>
  );
}
