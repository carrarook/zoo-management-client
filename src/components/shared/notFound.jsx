import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página Não Encontrada</h2>
        <p>A página que você está procurando não existe ou foi removida.</p>
        <Link to="/" className="btn btn-primary">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;