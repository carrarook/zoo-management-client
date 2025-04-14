import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// Removendo importações que possam estar puxando o layout antigo
// import '../styles/components/shared.css';
import '../../styles/components/auth.css'; // Importando apenas os estilos de autenticação

const AuthLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  // Se estiver autenticado, redirecionar para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`auth-layout ${darkMode ? 'dark-mode' : ''}`}>
      <div className="auth-container">
        {/* Botão para alternar modo escuro no canto superior */}
        <div className="auth-mode-toggle">
          <button onClick={toggleDarkMode} className="mode-toggle">
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
        
        {/* Logo centralizado */}
        <div className="auth-logo">
          <h1>ZooSystem</h1>
        </div>
        
        {/* Conteúdo (login ou registro) */}
        <div className="auth-content">
          <Outlet />
        </div>
        
        {/* Rodapé simples */}
        <div className="auth-footer">
          <p>© 2025 ZooSystem Management</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;