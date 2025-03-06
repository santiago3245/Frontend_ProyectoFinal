import { useState } from "react";
import ProductoList from "./ProductoList";
import ProductoForm from "./ProductoForm";
import { Container, Typography, Box } from "@mui/material";

interface Producto {
  id_producto?: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  id_categoria: string;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  id_empresa: string;
  id_proveedor: string;
  fecha_creacion?: string;
  ultima_actualizacion?: string;
}

const ProductoPage = () => {
  const [productoEdit, setProductoEdit] = useState<Producto | null>(null);

  const refreshList = () => {
    setProductoEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Productos
        </Typography>
      </Box>
      <ProductoForm productoEdit={productoEdit} onSave={refreshList} />
      <ProductoList onEdit={setProductoEdit} />
    </Container>
  );
};

export default ProductoPage;