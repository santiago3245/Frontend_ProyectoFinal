import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "./api";
import { getEmpresas } from "../Empresa/api";
import { getProveedores } from "../Proveedor/api";
import { getCategorias } from "../Categorias/api";
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface Producto {
  id_producto?: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  id_categoria: number;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  id_empresa: number;
  id_proveedor: number;
  fecha_creacion?: string;
  ultima_actualizacion?: string;
}

interface Empresa {
  id_empresa: number;
  nombre: string;
}

interface Proveedor {
  id_proveedor: number;
  nombre: string;
}

interface Categoria {
  id_categoria: number;
  nombre: string;
}

const ProductoForm = ({ productoEdit, onSave }: { productoEdit: Producto | null; onSave: () => void }) => {
  const [producto, setProducto] = useState<Producto>({
    codigo_barras: "",
    nombre: "",
    descripcion: "",
    id_categoria: 0,
    precio_compra: 0,
    precio_venta: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    id_empresa: 0,
    id_proveedor: 0,
    fecha_creacion: "",
    ultima_actualizacion: "",
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    if (productoEdit) setProducto(productoEdit);
    fetchEmpresas();
    fetchProveedores();
    fetchCategorias();
  }, [productoEdit]);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const fetchProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  const fetchCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const now = new Date().toISOString(); // Fecha válida para PostgreSQL
  
    const payload = {
      ...producto,
      id_categoria: { id_categoria: producto.id_categoria },
      id_empresa: { id_empresa: producto.id_empresa },
      id_proveedor: { id_proveedor: producto.id_proveedor },
      fecha_creacion: producto.id_producto ? producto.fecha_creacion : now, // Mantiene la fecha original en edición
      ultima_actualizacion: now, // Actualiza siempre
    };
  
    if (producto.id_producto) {
      await updateProduct(producto.id_producto, payload);
    } else {
      await createProduct(payload);
    }
  
    onSave();
    window.location.reload();
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {producto.id_producto ? "Editar Producto" : "Nuevo Producto"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Código de Barras"
            name="codigo_barras"
            value={producto.codigo_barras}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="id_categoria"
              value={producto.id_categoria}
              onChange={handleChange}
              required
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Precio de Compra"
            name="precio_compra"
            type="number"
            value={producto.precio_compra}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Precio de Venta"
            name="precio_venta"
            type="number"
            value={producto.precio_venta}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Stock Mínimo"
            name="stock_minimo"
            type="number"
            value={producto.stock_minimo}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Stock Máximo"
            name="stock_maximo"
            type="number"
            value={producto.stock_maximo}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Empresa</InputLabel>
            <Select
              name="id_empresa"
              value={producto.id_empresa}
              onChange={handleChange}
              required
            >
              {empresas.map((empresa) => (
                <MenuItem key={empresa.id_empresa} value={empresa.id_empresa}>
                  {empresa.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Proveedor</InputLabel>
            <Select
              name="id_proveedor"
              value={producto.id_proveedor}
              onChange={handleChange}
              required
            >
              {proveedores.map((proveedor) => (
                <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                  {proveedor.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default ProductoForm;