import axios from 'axios';

// Cria uma instância do axios com a URL base da API
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para tratamento de erros global
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Tratar erro de autenticação se necessário
      console.error('Erro de autenticação');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;