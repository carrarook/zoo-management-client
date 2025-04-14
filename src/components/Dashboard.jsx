// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/components/dashboard.css';
import { getEspeciesCount } from '../services/animalService';
import { getCuidadosCount } from '../services/cuidadoService';
import { getTotalAnimais } from '../services/animalService'; 


const Dashboard = () => {

  const [cuidadosCount, setCuidadosCount] = useState(0);
  const [especiesCount, setEspeciesCount] = useState(0);
  const [totalAnimais, setTotalAnimais] = useState(0);

useEffect(() => {
  const fetchTotalAnimais = async () => {
    try {
      const total = await getTotalAnimais();
      setTotalAnimais(total);
    } catch (error) {
      console.error('Erro ao carregar total de animais:', error);
      setTotalAnimais(0); // Valor padrão em caso de erro
    }
  };

  fetchTotalAnimais();
}, []);

  useEffect(() => {
    const fetchEspeciesCount = async () => {
      try {
        const count = await getEspeciesCount();
        setEspeciesCount(count);
      } catch (error) {
        console.error('Erro ao carregar contagem de espécies:', error);
      }
    };

    fetchEspeciesCount();
  }, []);

  useEffect(() => {
    const fetchCuidadosCount = async () => {
      try {
        const count = await getCuidadosCount();
        setCuidadosCount(count);
      } catch (error) {
        console.error('Erro ao carregar contagem:', error);
      }
    };

    fetchCuidadosCount();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card card-animals">
          <h3>Animais Totais</h3>
          <p className="card-value">{totalAnimais}</p>
          <span className="card-description">Registrados no sistema!</span>
        </div>
        
        <div className="card card-species">
          <h3>Espécies</h3>
          <p className="card-value">{especiesCount}</p>
          <span className="card-description">Espécies diferentes!</span>
        </div>
        
        <div className="card card-care">
          <h3>Cuidados Totais</h3>
          <p className="card-value">{cuidadosCount}</p>
          <span className="card-description">Cuidados Registrados no Sistema!</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;