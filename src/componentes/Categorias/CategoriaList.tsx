
// CategoriaList.tsx
import { useEffect, useState } from "react";
import { getCategorias, deleteCategoria } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

const CategoriaList = ({ onEdit }: { onEdit: (categoria: Categoria) => void }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const handleDeleteClick = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedCategoria) {
      await deleteCategoria(selectedCategoria.id_categoria);
      fetchCategorias();
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
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id_categoria}>
                <TableCell>{categoria.id_categoria}</TableCell>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>{categoria.descripcion}</TableCell>
                <TableCell>{categoria.fecha_creacion}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(categoria)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(categoria)} sx={{ marginLeft: 1 }}>
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
          <Typography>¿Estás seguro de que deseas eliminar esta categoría?</Typography>
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

export default CategoriaList;