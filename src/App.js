import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/appContext';
import AppRoutes from './routes/Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
