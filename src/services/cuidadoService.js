import axios from 'axios';

const API_URL = 'https://api.zoomanagement.com/api';

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