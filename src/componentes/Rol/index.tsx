import { useState } from "react";
import RolList from "./RolList";
import RolForm from "./RolForm";
import { Container, Typography, Box } from "@mui/material";

interface Rol {
  id_rol?: number;
  nombre: string;
  descripcion: string;
}

const RolPage = () => {
  const [rolEdit, setRolEdit] = useState<Rol | null>(null);

  const refreshList = () => {
    setRolEdit(null); 
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Roles
        </Typography>
      </Box>
      <RolForm rolEdit={rolEdit} onSave={refreshList} />
      <RolList onEdit={setRolEdit} />
    </Container>
  );
};

export default RolPage;
