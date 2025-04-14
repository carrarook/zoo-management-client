
import axios from 'axios';

const API_URL = 'https://sistemazoolgicoapi.azurewebsites.net/api'; //Produção
//const API_URL = 'https://localhost:7258/api'; // Testes Locais

const AuthService = {
  // Login de usuário
  login: async (email, senha) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha
      },
      {
        withCredentials: true 
      }
    );
      
      if (response.data) {
        // Salvar informações do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao realizar login';
    }
  },
  
  // Registro de novo usuário
  register: async (nome, email, senha) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        nome,
        email,
        senha
      },
      {
        withCredentials: true // <- adiciona aqui também, se necessário
      }
    );
      
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erro ao realizar cadastro';
    }
  },
  
  // Logout do usuário
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  },
  
  // Verifica se o usuário está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },
  
  // Retorna informações do usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default AuthService;