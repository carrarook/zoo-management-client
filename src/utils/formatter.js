// utils/formatters.js

// Função para formatar a data para o formato "10 de maio de 2018"
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
  };
  