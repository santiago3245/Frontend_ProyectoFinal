import { useState } from "react";
import InventarioList from "./InventarioList";
import InventarioForm from "./InventarioForm";
import { Container, Typography, Box } from "@mui/material";

interface Inventario {
  id_inventario?: number;
  id_empresa: number;
  fecha_actualizacion: Date;
}

const InventarioPage = () => {
  const [inventarioEdit, setInventarioEdit] = useState<Inventario | null>(null);

  const refreshList = () => {
    setInventarioEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Inventarios
        </Typography>
      </Box>
      <InventarioForm inventarioEdit={inventarioEdit} onSave={refreshList} />
      <InventarioList onEdit={setInventarioEdit} />
    </Container>
  );
};

export default InventarioPage;
