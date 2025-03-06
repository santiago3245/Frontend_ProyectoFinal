import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Producto {
  id_producto: number;
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
  fecha_creacion: string;
  ultima_actualizacion: string;
}

const ProductoList = ({ onEdit }: { onEdit: (producto: Producto) => void }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProducts();
    setProductos(data);
  };

  const handleDeleteClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedProducto) {
      await deleteProduct(selectedProducto.id_producto);
      fetchProductos(); // Recargar la lista después de eliminar
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProducto(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Código de Barras</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Precio Compra</TableCell>
              <TableCell>Precio Venta</TableCell>
              <TableCell>Stock Mínimo</TableCell>
              <TableCell>Stock Máximo</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Última Actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id_producto}>
                <TableCell>{producto.id_producto}</TableCell>
                <TableCell>{producto.codigo_barras}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>{producto.id_categoria}</TableCell>
                <TableCell>{producto.precio_compra}</TableCell>
                <TableCell>{producto.precio_venta}</TableCell>
                <TableCell>{producto.stock_minimo}</TableCell>
                <TableCell>{producto.stock_maximo}</TableCell>
                <TableCell>{producto.id_empresa}</TableCell>
                <TableCell>{producto.id_proveedor}</TableCell>
                <TableCell>{producto.fecha_creacion}</TableCell>
                <TableCell>{producto.ultima_actualizacion}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(producto)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(producto)}
                    sx={{ marginLeft: 1 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmación de Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este producto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductoList;