import axios from 'axios';

const API_URL = 'https://api.zoomanagement.com/api';

export const getAnimais = async () => {
  try {
    const response = await axios.get(`${API_URL}/animais`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    throw error;
  }
};

export const getAnimal = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/animais/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animal ${id}:`, error);
    throw error;
  }
};

export const createAnimal = async (animalData) => {
  try {
    const response = await axios.post(`${API_URL}/animais`, animalData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar animal:', error);
    throw error;
  }
};

export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axios.put(`${API_URL}/animais/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal ${id}:`, error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/animais/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir animal ${id}:`, error);
    throw error;
  }
};

export const addCuidadoToAnimal = async (animalId, cuidadoId) => {
  try {
    const response = await axios.post(`${API_URL}/animais/${animalId}/AddCuidado/${cuidadoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao adicionar cuidado ao animal:`, error);
    throw error;
  }
};

export const removeCuidadoFromAnimal = async (animalId, cuidadoId) => {
  try {
    const response = await axios.delete(`${API_URL}/animais/${animalId}/RemoveCuidado/${cuidadoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao remover cuidado do animal:`, error);
    throw error;
  }
};