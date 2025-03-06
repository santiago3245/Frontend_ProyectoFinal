import { useState } from "react";
import UsuarioList from "./UsuarioList";
import UsuarioForm from "./UsuarioForm";
import { Container, Typography, Box } from "@mui/material";

interface Usuario {
  id_usuario?: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  estado: string;
  fecha_creacion: Date;
  ultima_conexion: Date;
  password_hash: string;
  id_empresa: number;
}

const UsuarioPage = () => {
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);

  const refreshList = () => {
    setUsuarioEdit(null); 
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Usuarios
        </Typography>
      </Box>
      <UsuarioForm usuarioEdit={usuarioEdit} onSave={refreshList} />
      <UsuarioList onEdit={setUsuarioEdit} />
    </Container>
  );
};

export default UsuarioPage;