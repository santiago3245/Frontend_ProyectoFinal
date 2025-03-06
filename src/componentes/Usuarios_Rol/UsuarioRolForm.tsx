import { useState, useEffect } from "react";
import { createUsuarioRol, updateUsuarioRol, getUsuarios, getRoles } from "./api";
import { Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface UsuarioRol {
  id_usuario_rol?: number;
  id_usuario: number;
  id_rol: number;
  fecha_asignacion: Date;
  fecha_actualizacion?: Date;
}

interface Usuario {
  id_usuario: number;
  nombre_completo: string;
}

interface Rol {
  id_rol: number;
  nombre: string;
}

const UsuarioRolForm = ({ usuarioRolEdit, onSave }: { usuarioRolEdit: UsuarioRol | null; onSave: () => void }) => {
  const [usuarioRol, setUsuarioRol] = useState<UsuarioRol>({
    id_usuario: 0,
    id_rol: 0,
    fecha_asignacion: new Date(),
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);

  useEffect(() => {
    if (usuarioRolEdit) setUsuarioRol(usuarioRolEdit);
    fetchUsuarios();
    fetchRoles();
  }, [usuarioRolEdit]);

  const fetchUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setUsuarioRol({ ...usuarioRol, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuarioRol.id_usuario_rol) {
      await updateUsuarioRol(usuarioRol.id_usuario_rol, usuarioRol);
    } else {
      await createUsuarioRol(usuarioRol);
    }
    onSave(); // Actualizar lista
    setUsuarioRol({
      id_usuario: 0,
      id_rol: 0,
      fecha_asignacion: new Date(),
    });
    window.location.reload(); // Recargar la ventana
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {usuarioRol.id_usuario_rol ? "Editar Usuario-Rol" : "Nuevo Usuario-Rol"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Usuario</InputLabel>
            <Select
              name="id_usuario"
              value={usuarioRol.id_usuario}
              onChange={handleChange}
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id_usuario} value={usuario.id_usuario}>
                  {usuario.nombre_completo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              name="id_rol"
              value={usuarioRol.id_rol}
              onChange={handleChange}
              required
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id_rol} value={rol.id_rol}>
                  {rol.nombre}
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

export default UsuarioRolForm;