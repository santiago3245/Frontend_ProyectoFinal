import axios from "axios";

const API_URL = "http://localhost:3000/proveedor";

export const getProveedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProveedorById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProveedor = async (proveedor: { nombre: string; contacto: string; telefono: string; email: string; direccion: string }) => {
  const response = await axios.post(API_URL, proveedor);
  return response.data;
};

export const updateProveedor = async (id: number, proveedor: { nombre: string; contacto: string; telefono: string; email: string; direccion: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, proveedor);
  return response.data;
};

export const deleteProveedor = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};