import React from 'react';
import '../../styles/components/shared.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Spinner;