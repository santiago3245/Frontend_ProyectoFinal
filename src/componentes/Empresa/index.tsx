import { useState } from "react";
import EmpresaList from "./EmpresaList";
import EmpresaForm from "./EmpresaForm";
import { Container, Typography, Box } from "@mui/material";

interface Empresa {
  id_empresa?: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email_contacto: string;
  sector: string;
  fecha_creacion: Date;
  estado: string;
}

const EmpresaPage = () => {
  const [empresaEdit, setEmpresaEdit] = useState<Empresa | null>(null);

  const refreshList = () => {
    setEmpresaEdit(null); 
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Empresas
        </Typography>
      </Box>
      <EmpresaForm empresaEdit={empresaEdit} onSave={refreshList} />
      <EmpresaList onEdit={setEmpresaEdit} />
    </Container>
  );
};

export default EmpresaPage;
