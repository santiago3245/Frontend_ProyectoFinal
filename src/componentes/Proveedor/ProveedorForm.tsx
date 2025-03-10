import { useState, useEffect } from "react";
import { createProveedor, updateProveedor } from "./api";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

interface Proveedor {
  id_proveedor?: number;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

const ProveedorForm = ({ proveedorEdit, onSave }: { proveedorEdit: Proveedor | null; onSave: () => void }) => {
  const [proveedor, setProveedor] = useState<Proveedor>({ nombre: "", contacto: "", telefono: "", email: "", direccion: "" });

  useEffect(() => {
    if (proveedorEdit) setProveedor(proveedorEdit);
  }, [proveedorEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (proveedor.id_proveedor) {
      await updateProveedor(proveedor.id_proveedor, proveedor);
    } else {
      await createProveedor(proveedor);
    }
    onSave();
    setProveedor({ nombre: "", contacto: "", telefono: "", email: "", direccion: "" });
    window.location.reload();
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {proveedor.id_proveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField fullWidth label="Nombre" name="nombre" value={proveedor.nombre} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Contacto" name="contacto" value={proveedor.contacto} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Teléfono" name="telefono" value={proveedor.telefono} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Email" name="email" value={proveedor.email} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Dirección" name="direccion" value={proveedor.direccion} onChange={handleChange} margin="normal" required />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default ProveedorForm;