const API_URL = "http://localhost:3000"; // Ajusta según tu configuración

export const getEmpresas = async () => {
  const response = await fetch(`${API_URL}/empresa`);
  return response.json();
};

export const getInventarios = async () => {
  const response = await fetch(`${API_URL}/inventario`);
  return response.json();
};

export const createInventario = async (inventario: { id_empresa: number; fecha_actualizacion: Date }) => {
  const response = await fetch(`${API_URL}/inventario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventario),
  });
  return response.json();
};

export const updateInventario = async (id: number, inventario: { id_empresa: number; fecha_actualizacion: Date }) => {
  await fetch(`${API_URL}/inventario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventario),
  });
};

export const deleteInventario = async (id: number) => {
  await fetch(`${API_URL}/inventario/${id}`, { method: "DELETE" });
};
