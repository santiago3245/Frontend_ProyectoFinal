import { useState, useEffect } from "react";
import { getUsuarioRoles, deleteUsuarioRol } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface UsuarioRol {
  id_usuario_rol: number;
  id_usuario: { nombre_completo: string }; // Modificado
  id_rol: { nombre: string }; // Modificado
  fecha_asignacion: Date;
}

const UsuarioRolList = ({ onEdit }: { onEdit: (usuarioRol: UsuarioRol) => void }) => {
  const [usuarioRoles, setUsuarioRoles] = useState<UsuarioRol[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsuarioRol, setSelectedUsuarioRol] = useState<UsuarioRol | null>(null);

  useEffect(() => {
    fetchUsuarioRoles();
  }, []);

  const fetchUsuarioRoles = async () => {
    const data = await getUsuarioRoles();
    setUsuarioRoles(data);
  };

  const handleDeleteClick = (usuarioRol: UsuarioRol) => {
    setSelectedUsuarioRol(usuarioRol);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedUsuarioRol) {
      await deleteUsuarioRol(selectedUsuarioRol.id_usuario_rol);
      fetchUsuarioRoles(); // Recargar la lista después de eliminar
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUsuarioRol(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Usuario</TableCell>
              <TableCell>Nombre Rol</TableCell>
              <TableCell>Fecha de Asignación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarioRoles.map((usuarioRol) => (
              <TableRow key={usuarioRol.id_usuario_rol}>
                <TableCell>{usuarioRol.id_usuario.nombre_completo}</TableCell>
                <TableCell>{usuarioRol.id_rol.nombre}</TableCell>
                <TableCell>{new Date(usuarioRol.fecha_asignacion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(usuarioRol)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(usuarioRol)}
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
          <Typography>¿Estás seguro de que deseas eliminar este usuario-rol?</Typography>
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

export default UsuarioRolList;