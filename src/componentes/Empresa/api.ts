import axios from "axios";

const API_URL = "http://localhost:3000/empresa";

export const getEmpresas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEmpresaById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmpresa = async (empresa: { nombre: string; ruc: string; direccion: string; telefono: string; email_contacto: string; sector: string; fecha_creacion: Date; estado: string }) => {
  const response = await axios.post(API_URL, empresa);
  return response.data;
};

export const updateEmpresa = async (id: number, empresa: { nombre: string; ruc: string; direccion: string; telefono: string; email_contacto: string; sector: string; fecha_creacion: Date; estado: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, empresa);
  return response.data;
};

export const deleteEmpresa = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
