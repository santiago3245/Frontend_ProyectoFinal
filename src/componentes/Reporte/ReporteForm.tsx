import { useState, useEffect } from "react";
import { createReporte, updateReporte } from "./api";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

interface Reporte {
  id_reporte?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

const ReporteForm = ({ reporteEdit, onSave }: { reporteEdit: Reporte | null; onSave: () => void }) => {
  const [reporte, setReporte] = useState<Reporte>({ nombre: "", descripcion: "", fecha_creacion: "" });

  useEffect(() => {
    if (reporteEdit) setReporte(reporteEdit);
  }, [reporteEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReporte({ ...reporte, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reporteToSave = { ...reporte, fecha_creacion: new Date(reporte.fecha_creacion) };
    if (reporte.id_reporte) {
      await updateReporte(reporte.id_reporte, reporteToSave);
    } else {
      await createReporte(reporteToSave);
    }
    onSave();
    setReporte({ nombre: "", descripcion: "", fecha_creacion: "" });
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {reporte.id_reporte ? "Editar Reporte" : "Nuevo Reporte"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField fullWidth label="Nombre" name="nombre" value={reporte.nombre} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Descripción" name="descripcion" value={reporte.descripcion} onChange={handleChange} margin="normal" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Fecha de Creación" name="fecha_creacion" type="date" value={reporte.fecha_creacion} onChange={handleChange} margin="normal" required />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default ReporteForm;