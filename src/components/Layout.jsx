import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/shared.css';
import { Link } from 'react-router-dom';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`layout ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <h1>ZooSystem</h1>
        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </header>

          <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/animais">Animais</Link>
        <Link to="/cuidados">Cuidados</Link>
        <Link to="/surpresa">Perfil - a fazer -</Link>
    </nav>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2025 ZooSystem Management</p>
      </footer>
    </div>
  );
};

export default Layout;