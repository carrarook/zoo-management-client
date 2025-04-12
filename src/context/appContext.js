import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const AppContext = createContext();

// Hook personalizado para usar o contexto
export const useAppContext = () => useContext(AppContext);

// Provider do contexto
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Funções para gerenciar estado global
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const clearError = () => setError(null);

  const handleError = (error) => {
    console.error(error);
    setError(error.message || 'Ocorreu um erro inesperado.');
  };

  // Valores expostos pelo contexto
  const value = {
    loading,
    setLoading,
    error,
    setError,
    clearError,
    notification,
    showNotification,
    handleError
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

//
// import React, { createContext, useContext, useState, useCallback } from 'react';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

//   const showNotification = useCallback((message, type = 'success') => {
//     setNotification({ show: true, message, type });
    
//     // Auto-hide after 3 seconds
//     setTimeout(() => {
//       setNotification({ show: false, message: '', type: 'success' });
//     }, 3000);
//   }, []);

//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);

//   const value = {
//     loading,
//     setLoading,
//     error,
//     setError,
//     clearError,
//     notification,
//     showNotification
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };

// export default AppContext;