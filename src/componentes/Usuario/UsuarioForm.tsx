import { useState, useEffect } from "react";
import { createUsuario, updateUsuario } from "./api";
import { getEmpresas } from "../Empresa/api";
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

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

interface Empresa {
  id_empresa: number;
  nombre: string;
}

const UsuarioForm = ({ usuarioEdit, onSave }: { usuarioEdit: Usuario | null; onSave: () => void }) => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre_completo: "",
    email: "",
    telefono: "",
    estado: "",
    fecha_creacion: new Date(),
    ultima_conexion: new Date(),
    password_hash: "",
    id_empresa: 0,
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    if (usuarioEdit) setUsuario(usuarioEdit);
    fetchEmpresas();
  }, [usuarioEdit]);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario.id_usuario) {
      await updateUsuario(usuario.id_usuario, usuario);
    } else {
      await createUsuario(usuario);
    }
    onSave(); // Actualizar lista
    setUsuario({
      nombre_completo: "",
      email: "",
      telefono: "",
      estado: "",
      fecha_creacion: new Date(),
      ultima_conexion: new Date(),
      password_hash: "",
      id_empresa: 0,
    }); // Resetear formulario
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {usuario.id_usuario ? "Editar Usuario" : "Nuevo Usuario"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre Completo"
            name="nombre_completo"
            value={usuario.nombre_completo}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={usuario.email}
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
            value={usuario.telefono}
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
            value={usuario.estado}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Empresa</InputLabel>
            <Select
              name="id_empresa"
              value={usuario.id_empresa}
              onChange={handleChange}
              required
            >
              {empresas.map((empresa) => (
                <MenuItem key={empresa.id_empresa} value={empresa.id_empresa}>
                  {empresa.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default UsuarioForm;