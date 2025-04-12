
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/shared.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Zoo Management</h1>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© 2025 Zoo Management</p>
      </footer>
    </div>
  );
};

export default Layout;
