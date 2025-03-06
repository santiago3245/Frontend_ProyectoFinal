import axios from "axios";

const API_URL = "http://localhost:3000/reporte";

export const getReportes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getReporteById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createReporte = async (reporte: { nombre: string; descripcion: string; fecha_creacion: Date }) => {
  const response = await axios.post(API_URL, reporte);
  return response.data;
};

export const updateReporte = async (id: number, reporte: { nombre: string; descripcion: string; fecha_creacion: Date }) => {
  const response = await axios.put(`${API_URL}/${id}`, reporte);
  return response.data;
};

export const deleteReporte = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};