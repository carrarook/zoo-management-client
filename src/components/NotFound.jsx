// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import '../styles/components/notFound.css';

const NotFound = () => {
  const { darkMode } = useAppContext(); // Assumindo que você tem darkMode no context

  return (
    <div className={`not-found-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Página não encontrada</h1>
        <p className="error-message">
          O conteúdo que você está procurando não deu tempo de ser implementeado :( 
        </p>
        <Link to="/" className="home-button">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;