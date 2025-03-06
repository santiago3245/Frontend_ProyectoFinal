import { useEffect, useState } from "react";
import { getReportes, deleteReporte } from "./api";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Reporte {
  id_reporte?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

const ReporteList = ({ onEdit }: { onEdit: (reporte: Reporte) => void }) => {
  const [reportes, setReportes] = useState<Reporte[]>([]);

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    const data = await getReportes();
    setReportes(data);
  };

  const handleDelete = async (id: number) => {
    await deleteReporte(id);
    fetchReportes();
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Reportes
      </Typography>
      <List>
        {reportes.map((reporte) => (
          <ListItem key={reporte.id_reporte}>
            <ListItemText primary={reporte.nombre} secondary={reporte.descripcion} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(reporte)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(reporte.id_reporte!)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ReporteList;