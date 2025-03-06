import { useState, useEffect } from "react";
import { createEmpresa, updateEmpresa } from "./api";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

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

const EmpresaForm = ({ empresaEdit, onSave }: { empresaEdit: Empresa | null; onSave: () => void }) => {
  const [empresa, setEmpresa] = useState<Empresa>({
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    email_contacto: "",
    sector: "",
    fecha_creacion: new Date(),
    estado: "",
  });

  useEffect(() => {
    if (empresaEdit) setEmpresa(empresaEdit);
  }, [empresaEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (empresa.id_empresa) {
      await updateEmpresa(empresa.id_empresa, empresa);
    } else {
      await createEmpresa(empresa);
    }
    onSave(); // Actualizar lista
    setEmpresa({
      nombre: "",
      ruc: "",
      direccion: "",
      telefono: "",
      email_contacto: "",
      sector: "",
      fecha_creacion: new Date(),
      estado: "",
    }); // Resetear formulario
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {empresa.id_empresa ? "Editar Empresa" : "Nueva Empresa"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={empresa.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="RUC"
            name="ruc"
            value={empresa.ruc}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={empresa.direccion}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={empresa.telefono}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email de Contacto"
            name="email_contacto"
            value={empresa.email_contacto}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Sector"
            name="sector"
            value={empresa.sector}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Estado"
            name="estado"
            value={empresa.estado}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default EmpresaForm;
