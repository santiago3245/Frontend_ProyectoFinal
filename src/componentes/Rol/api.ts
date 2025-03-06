import axios from "axios";

const API_URL = "http://localhost:3000/rol";

export const getRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRolById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRol = async (rol: { nombre: string; descripcion: string }) => {
  const response = await axios.post(API_URL, rol);
  return response.data;
};

export const updateRol = async (id: number, rol: { nombre: string; descripcion: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, rol);
  return response.data;
};

export const deleteRol = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
