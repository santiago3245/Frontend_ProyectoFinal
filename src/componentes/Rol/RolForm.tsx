import { useState, useEffect } from "react";
import { createRol, updateRol } from "./api";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

interface Rol {
  id_rol?: number;
  nombre: string;
  descripcion: string;
}

const RolForm = ({ rolEdit, onSave }: { rolEdit: Rol | null; onSave: () => void }) => {
  const [rol, setRol] = useState<Rol>({ nombre: "", descripcion: "" });

  useEffect(() => {
    if (rolEdit) setRol(rolEdit);
  }, [rolEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRol({ ...rol, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rol.id_rol) {
      await updateRol(rol.id_rol, rol);
    } else {
      await createRol(rol);
    }
    onSave(); // Actualizar lista
    setRol({ nombre: "", descripcion: "" }); // Resetear formulario
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {rol.id_rol ? "Editar Rol" : "Nuevo Rol"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={rol.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={rol.descripcion}
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

export default RolForm;
