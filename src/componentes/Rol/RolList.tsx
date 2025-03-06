import { useEffect, useState } from "react";
import { getRoles, deleteRol } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Rol {
  id_rol: number;
  nombre: string;
  descripcion: string;
}

const RolList = ({ onEdit }: { onEdit: (rol: Rol) => void }) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleDeleteClick = (rol: Rol) => {
    setSelectedRol(rol);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedRol) {
      await deleteRol(selectedRol.id_rol);
      fetchRoles(); // Recargar la lista después de eliminar
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRol(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((rol) => (
              <TableRow key={rol.id_rol}>
                <TableCell>{rol.id_rol}</TableCell>
                <TableCell>{rol.nombre}</TableCell>
                <TableCell>{rol.descripcion}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(rol)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(rol)}
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
          <Typography>Are you sure you want to delete this role?</Typography>
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

export default RolList;
