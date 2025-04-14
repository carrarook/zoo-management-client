import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/perfil.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Meu Perfil</h2>
        
        <div className="profile-info">
          <div className="profile-field">
            <span className="profile-label">ID:</span>
            <span className="profile-value">{user.$id}</span>
          </div>
          
          <div className="profile-field">
            <span className="profile-label">Nome:</span>
            <span className="profile-value">{user.nome}</span>
          </div>
          
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;