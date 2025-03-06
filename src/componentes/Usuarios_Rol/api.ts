import axios from "axios";

const API_URL = "http://localhost:3000/usuario-rol";
const API_URL_USUARIOS = "http://localhost:3000/usuario";
const API_URL_ROLES = "http://localhost:3000/rol";

export const getUsuarioRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUsuarioRolById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createUsuarioRol = async (usuarioRol: { id_usuario: number; id_rol: number; fecha_asignacion: Date }) => {
  const response = await axios.post(API_URL, usuarioRol);
  return response.data;
};

export const updateUsuarioRol = async (id: number, usuarioRol: { id_usuario: number; id_rol: number; fecha_asignacion: Date }) => {
  const response = await axios.put(`${API_URL}/${id}`, usuarioRol);
  return response.data;
};

export const deleteUsuarioRol = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getUsuarios = async () => {
  const response = await axios.get(API_URL_USUARIOS);
  return response.data;
};

export const getRoles = async () => {
  const response = await axios.get(API_URL_ROLES);
  return response.data;
};