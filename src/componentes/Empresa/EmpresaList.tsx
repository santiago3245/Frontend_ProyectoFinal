import { useEffect, useState } from "react";
import { getEmpresas, deleteEmpresa } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Empresa {
  id_empresa: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email_contacto: string;
  sector: string;
  fecha_creacion: Date;
  estado: string;
}

const EmpresaList = ({ onEdit }: { onEdit: (empresa: Empresa) => void }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const handleDeleteClick = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedEmpresa) {
      await deleteEmpresa(selectedEmpresa.id_empresa);
      fetchEmpresas(); // Recargar la lista después de eliminar
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmpresa(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow key={empresa.id_empresa}>
                <TableCell>{empresa.nombre}</TableCell>
                <TableCell>{empresa.ruc}</TableCell>
                <TableCell>{empresa.direccion}</TableCell>
                <TableCell>{empresa.telefono}</TableCell>
                <TableCell>{empresa.email_contacto}</TableCell>
                <TableCell>{empresa.sector}</TableCell>
                <TableCell>{empresa.estado}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(empresa)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(empresa)}
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
          <Typography>¿Estás seguro de que deseas eliminar esta empresa?</Typography>
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

export default EmpresaList;
