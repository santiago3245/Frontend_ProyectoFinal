import axios from 'axios';


const API_URL = 'http://localhost:3000/pedido';

export const getPedidos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPedido = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPedido = async (pedido: any) => {
  const response = await axios.post(API_URL, pedido);
  return response.data;
};

export const updatePedido = async (id: number, pedido: any) => {
  const response = await axios.put(`${API_URL}/${id}`, pedido);
  return response.data;
};

export const deletePedido = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};