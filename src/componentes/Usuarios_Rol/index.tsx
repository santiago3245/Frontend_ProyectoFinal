import { useState } from "react";
import UsuarioRolList from "./UsuarioRolList";
import UsuarioRolForm from "./UsuarioRolForm";
import { Container, Typography, Box } from "@mui/material";

interface UsuarioRol {
  id_usuario_rol?: number;
  id_usuario: number;
  id_rol: number;
  fecha_asignacion: Date;
}

const UsuarioRolPage = () => {
  const [usuarioRolEdit, setUsuarioRolEdit] = useState<UsuarioRol | null>(null);

  const refreshList = () => {
    setUsuarioRolEdit(null); 
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Usuario-Rol
        </Typography>
      </Box>
      <UsuarioRolForm usuarioRolEdit={usuarioRolEdit} onSave={refreshList} />
      <UsuarioRolList onEdit={setUsuarioRolEdit} />
    </Container>
  );
};

export default UsuarioRolPage;