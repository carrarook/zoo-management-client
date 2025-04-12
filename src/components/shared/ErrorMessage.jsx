import React from 'react';
import '../../styles/components/shared.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <div className="error-content">
        <h3>Erro</h3>
        <p>{message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;