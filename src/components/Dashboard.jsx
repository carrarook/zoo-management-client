// src/pages/Dashboard.jsx
import React from 'react';
import '../styles/components/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card card-animals">
          <h3>Animais Totais</h3>
          <p className="card-value">42</p>
          <span className="card-description">Registrados no sistema!</span>
        </div>
        
        <div className="card card-species">
          <h3>Espécies</h3>
          <p className="card-value">5</p>
          <span className="card-description">Espécies diferentes!</span>
        </div>
        
        <div className="card card-care">
          <h3>Cuidados Totais</h3>
          <p className="card-value">7</p>
          <span className="card-description">Cuidados Registrados no Sistema!</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;