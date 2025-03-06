import { useState } from "react";
import CategoriaList from "./CategoriaList";
import CategoriaForm from "./CategoriaForm";
import { Container, Typography, Box } from "@mui/material";

interface Categoria {
  id_categoria?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

const CategoriaPage = () => {
  const [categoriaEdit, setCategoriaEdit] = useState<Categoria | null>(null);

  const refreshList = () => {
    setCategoriaEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Categorías
        </Typography>
      </Box>
      <CategoriaForm categoriaEdit={categoriaEdit} onSave={refreshList} />
      <CategoriaList onEdit={setCategoriaEdit} />
    </Container>
  );
};

export default CategoriaPage;
