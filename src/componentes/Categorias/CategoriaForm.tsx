// CategoriaForm.tsx
import { useState, useEffect } from "react";
import { createCategoria, updateCategoria } from "./api";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

interface Categoria {
  id_categoria?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

const CategoriaForm = ({ categoriaEdit, onSave }: { categoriaEdit: Categoria | null; onSave: () => void }) => {
  const [categoria, setCategoria] = useState<Categoria>({ nombre: "", descripcion: "", fecha_creacion: "" });

  useEffect(() => {
    if (categoriaEdit) setCategoria(categoriaEdit);
  }, [categoriaEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoria.id_categoria) {
      await updateCategoria(categoria.id_categoria, categoria);
    } else {
      await createCategoria(categoria);
    }
    onSave();
    setCategoria({ nombre: "", descripcion: "", fecha_creacion: "" });
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {categoria.id_categoria ? "Editar Categoría" : "Nueva Categoría"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField fullWidth label="Nombre" name="nombre" value={categoria.nombre} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Descripción" name="descripcion" value={categoria.descripcion} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Fecha de Creación" name="fecha_creacion" type="date" value={categoria.fecha_creacion} onChange={handleChange} margin="normal" required />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default CategoriaForm;