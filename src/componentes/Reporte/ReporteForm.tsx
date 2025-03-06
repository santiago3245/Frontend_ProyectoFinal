import { useState, useEffect } from "react";
import { createReporte, updateReporte } from "./api";
import { getEmpresas } from "../Empresa/api";
import { getUsuarios } from "../Usuario/api";
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface Reporte {
  id_reporte?: number;
  id_empresa: number;
  tipo: string;
  archivo_pdf: string;
  id_usuario: number;
}

interface Empresa {
  id_empresa: number;
  nombre: string;
}

interface Usuario {
  id_usuario: number;
  nombre_completo: string;
}

const ReporteForm = ({ reporteEdit, onSave }: { reporteEdit: Reporte | null; onSave: () => void }) => {
  const [reporte, setReporte] = useState<Reporte>({
    id_empresa: 0,
    tipo: "",
    archivo_pdf: "",
    id_usuario: 0,
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    if (reporteEdit) setReporte(reporteEdit);
    fetchEmpresas();
    fetchUsuarios();
  }, [reporteEdit]);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const fetchUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setReporte({ ...reporte, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString(); // Fecha válida para PostgreSQL
    const payload = {
      ...reporte,
      id_empresa: { id_empresa: reporte.id_empresa },
      id_usuario: { id_usuario: reporte.id_usuario },
      fecha_generacion: now, // Fecha de generación automática
    };
    if (reporte.id_reporte) {
      await updateReporte(reporte.id_reporte, payload);
    } else {
      await createReporte(payload);
    }
    onSave();
    setReporte({
      id_empresa: 0,
      tipo: "",
      archivo_pdf: "",
      id_usuario: 0,
    });
    window.location.reload();
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {reporte.id_reporte ? "Editar Reporte" : "Nuevo Reporte"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Empresa</InputLabel>
            <Select
              name="id_empresa"
              value={reporte.id_empresa}
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
        <Box mb={2}>
          <TextField
            fullWidth
            label="Tipo"
            name="tipo"
            value={reporte.tipo}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Archivo PDF"
            name="archivo_pdf"
            value={reporte.archivo_pdf}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Usuario</InputLabel>
            <Select
              name="id_usuario"
              value={reporte.id_usuario}
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default ReporteForm;