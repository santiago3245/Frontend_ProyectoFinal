import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta según tu configuración

// Productos
export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/producto`);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_URL}/producto/${id}`);
    return response.data;
};

export const createProduct = async (product: any) => {
    const response = await axios.post(`${API_URL}/producto`, product);
    return response.data;
};

export const updateProduct = async (id: number, product: any) => {
    const response = await axios.put(`${API_URL}/producto/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await axios.delete(`${API_URL}/producto/${id}`);
    return response.data;
};