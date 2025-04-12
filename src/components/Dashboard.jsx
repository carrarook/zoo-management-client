// src/pages/Dashboard.jsx
import React from 'react';
import '../styles/components/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total de Animais</h3>
          <p>42</p>
        </div>
        <div className="card">
          <h3>Cuidados Pendentes</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
