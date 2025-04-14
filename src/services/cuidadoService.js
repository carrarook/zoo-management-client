import axios from 'axios';

const API_URL = 'https://sistemazoolgicoapi.azurewebsites.net/api'; //Produção
//const API_URL = 'https://localhost:7258/api'; // Testes Locais


// dash

export const getCuidadosCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/cuidados`);
    const data = response.data;
    
    // Extrai todos os IDs de cuidados únicos
    const uniqueCuidadosIds = new Set();
    
    // Processa o array principal ($values)
    data.$values.forEach(cuidado => {
      if (cuidado.id) {
        uniqueCuidadosIds.add(cuidado.id);
      }
    });
    

    const refs = data.$values
      .filter(item => item.$ref)
      .map(ref => {
        const refId = ref.$ref.split('_')[1]; 
        return parseInt(refId);
      });
    
    refs.forEach(id => uniqueCuidadosIds.add(id));
    
    return uniqueCuidadosIds.size;
  } catch (error) {
    console.error('Erro ao contar cuidados:', error);
    throw error;
  }
};


export const getCuidados = async () => {
  try {
    const response = await axios.get(`${API_URL}/cuidados`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cuidados:', error);
    throw error;
  }
};

export const getCuidado = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cuidados/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cuidado ${id}:`, error);
    throw error;
  }
};

export const createCuidado = async (cuidadoData) => {
  try {
    const response = await axios.post(`${API_URL}/cuidados`, cuidadoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cuidado:', error);
    throw error;
  }
};

export const updateCuidado = async (id, cuidadoData) => {
  try {
    const response = await axios.put(`${API_URL}/cuidados/${id}`, cuidadoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cuidado ${id}:`, error);
    throw error;
  }
};

export const deleteCuidado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/cuidados/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir cuidado ${id}:`, error);
    throw error;
  }
};

export const getAnimaisPorCuidado = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cuidados/${id}/animais`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animais do cuidado ${id}:`, error);
    throw error;
  }
};

export const addAnimalToCuidado = async (cuidadoId, animalId) => {
  try {
    const response = await axios.post(`${API_URL}/cuidados/${cuidadoId}/animais/${animalId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao adicionar animal ao cuidado:`, error);
    throw error;
  }
};

