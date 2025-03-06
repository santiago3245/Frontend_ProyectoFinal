import { useState } from "react";
import ProveedorList from "./ProveedorList";
import ProveedorForm from "./ProveedorForm";
import { Container, Typography, Box } from "@mui/material";

interface Proveedor {
  id_proveedor?: number;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha_creacion: string;
}

const ProveedorPage = () => {
  const [proveedorEdit, setProveedorEdit] = useState<Proveedor | null>(null);

  const refreshList = () => {
    setProveedorEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Proveedores
        </Typography>
      </Box>
      <ProveedorForm proveedorEdit={proveedorEdit} onSave={refreshList} />
      <ProveedorList onEdit={setProveedorEdit} />
    </Container>
  );
};

export default ProveedorPage;