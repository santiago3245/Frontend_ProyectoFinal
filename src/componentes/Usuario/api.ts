import axios from "axios";

const API_URL = "http://localhost:3000/usuario";

export const getUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUsuarioById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createUsuario = async (usuario: { nombre_completo: string; email: string; telefono: string; estado: string; fecha_creacion: Date; ultima_conexion: Date; password_hash: string; id_empresa: number }) => {
  const response = await axios.post(API_URL, usuario);
  return response.data;
};

export const updateUsuario = async (id: number, usuario: { nombre_completo: string; email: string; telefono: string; estado: string; fecha_creacion: Date; ultima_conexion: Date; password_hash: string; id_empresa: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};