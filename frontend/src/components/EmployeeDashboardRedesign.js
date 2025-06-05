import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles.css';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EmployeeDashboardRedesign({ employee, onLogout }) {
  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <h1>Employee Dashboard</h1>
        <div className="top-bar-icons">
          <button className="icon-button" title="Search">🔍</button>
          <button className="icon-button" title="Notifications">🔔</button>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="user-avatar" />
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar" className="user-avatar" />
          <button className="btn btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </header>
      <main className="dashboard-main-content">
        <section className="metrics-cards">
          <div className="metric-card blue">
            <h3>Project Progress</h3>
            <p>2374</p>
            <p>Customer Satisfaction</p>
          </div>
          <div className="metric-card pink">
            <h3>Metrics</h3>
            <p>Customer Satisfaction</p>
            <button className="btn btn-primary">Toggle</button>
          </div>
        </section>
        <section className="charts-section">
          <div className="line-chart-container">
            <h3>Project Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={projectProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#2962ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-chart-container">
            <h3>Team Progress</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={teamProgressData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {teamProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </section>
        <section className="bottom-section">
          <div className="recent-activities">
            <h3>Performance</h3>
            <p>Some performance details here...</p>
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
  );
}
