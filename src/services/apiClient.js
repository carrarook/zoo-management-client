import axios from 'axios';

//const API_URL = 'https://sistemazoolgicoapi.azurewebsites.net/api'; //Produção
const API_URL = 'https://localhost:7258/api'; // Testes Locais

// Cria uma instância do axios com a URL base da API
//---------------------------------------------------
//--------------------- PRODUÇÃO --------------------
//---------------------------------------------------
// const apiClient = axios.create({ 
//   baseURL: process.env.REACT_APP_API_URL || 'https://sistemazoolgicoapi.azurewebsites.net/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });


//---------------------------------------------------
//--------------------- TESTES ---------------------- 
//---------------------------------------------------
const apiClient = axios.create({ 
   baseURL: process.env.REACT_APP_API_URL || 'https://sistemazoolgicoapi.azurewebsites.net/api',
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