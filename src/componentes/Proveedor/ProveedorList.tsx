import { useEffect, useState } from "react";
import { getProveedores, deleteProveedor } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Proveedor {
  id_proveedor: number;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

const ProveedorList = ({ onEdit }: { onEdit: (proveedor: Proveedor) => void }) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  const handleDeleteClick = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedProveedor) {
      await deleteProveedor(selectedProveedor.id_proveedor);
      fetchProveedores();
    }
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Fecha de Actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((proveedor) => (
              <TableRow key={proveedor.id_proveedor}>
                <TableCell>{proveedor.id_proveedor}</TableCell>
                <TableCell>{proveedor.nombre}</TableCell>
                <TableCell>{proveedor.contacto}</TableCell>
                <TableCell>{proveedor.telefono}</TableCell>
                <TableCell>{proveedor.email}</TableCell>
                <TableCell>{proveedor.direccion}</TableCell>
                <TableCell>{new Date(proveedor.fecha_creacion).toLocaleDateString()}</TableCell>
                <TableCell>{proveedor.fecha_actualizacion ? new Date(proveedor.fecha_actualizacion).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(proveedor)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(proveedor)} sx={{ marginLeft: 1 }}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación de Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este proveedor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
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

export default ProveedorList;