import { useEffect, useState } from "react";
import { getEmpresas, getInventarios, deleteInventario } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Empresa {
  id_empresa: number;
  nombre: string;
}

interface Inventario {
  id_inventario: number;
  id_empresa: number;
  fecha_actualizacion: Date;
}

const InventarioList = ({ onEdit }: { onEdit: (inventario: Inventario) => void }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInventario, setSelectedInventario] = useState<Inventario | null>(null);

  useEffect(() => {
    fetchEmpresas();
    fetchInventarios();
  }, []);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
    console.log("Empresas:", data); // Mostrar las empresas para verificar
  };

  const fetchInventarios = async () => {
    const data = await getInventarios();
    setInventarios(data);
    console.log("Inventarios:", data); // Mostrar los inventarios para verificar
  };

  const handleDeleteClick = (inventario: Inventario) => {
    setSelectedInventario(inventario);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedInventario) {
      await deleteInventario(selectedInventario.id_inventario);
      fetchInventarios();
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInventario(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Fecha Actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarios.map((inventario) => {
              console.log("Inventario:", inventario); // Verifica el contenido de cada inventario
              // Encuentra el nombre de la empresa correspondiente al id_empresa
              const empresa = empresas.find((empresa) => empresa.id_empresa === inventario.id_empresa);
              return (
                <TableRow key={inventario.id_inventario}>
                  <TableCell>{inventario.id_inventario}</TableCell>
                  <TableCell>
                    {empresa
                      ? empresa.nombre
                      : `Empresa no encontrada (ID: ${inventario.id_empresa})`}
                  </TableCell>
                  <TableCell>{new Date(inventario.fecha_actualizacion).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => onEdit(inventario)}>
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(inventario)}
                      sx={{ marginLeft: 1 }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmación de Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este inventario?</Typography>
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

export default InventarioList;
