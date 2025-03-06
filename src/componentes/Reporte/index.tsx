import { useState } from "react";
import ReporteList from "./ReporteList";
import ReporteForm from "./ReporteForm";
import { Container, Typography, Box } from "@mui/material";

interface Reporte {
  id_reporte?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: Date;
}

const ReportePage = () => {
  const [reporteEdit, setReporteEdit] = useState<Reporte | null>(null);

  const refreshList = () => {
    setReporteEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Reportes
        </Typography>
      </Box>
      <ReporteForm reporteEdit={reporteEdit} onSave={refreshList} />
      <ReporteList onEdit={setReporteEdit} />
    </Container>
  );
};

export default ReportePage;