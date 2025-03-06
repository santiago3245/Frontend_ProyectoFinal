import { useState, useEffect } from "react";
import { getEmpresas, createInventario, updateInventario } from "./api";
import { TextField, Button, Paper, Typography, Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

interface Empresa {
  id_empresa: number;
  nombre: string;
}

interface Inventario {
  id_inventario?: number;
  id_empresa: number;
  fecha_actualizacion: Date;
}

const InventarioForm = ({ inventarioEdit, onSave }: { inventarioEdit: Inventario | null; onSave: () => void }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [inventario, setInventario] = useState<Inventario>({
    id_empresa: 0,
    fecha_actualizacion: new Date(),
  });

  useEffect(() => {
    fetchEmpresas();
    if (inventarioEdit) setInventario(inventarioEdit);
  }, [inventarioEdit]);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const handleChange = (e: SelectChangeEvent<number>) => {
    setInventario({ ...inventario, [e.target.name as string]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inventario.id_inventario) {
      await updateInventario(inventario.id_inventario, inventario);
    } else {
      await createInventario(inventario);
    }
    onSave();
    setInventario({ id_empresa: 0, fecha_actualizacion: new Date() });
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {inventario.id_inventario ? "Editar Inventario" : "Nuevo Inventario"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Empresa</InputLabel>
            <Select
              name="id_empresa"
              value={inventario.id_empresa}
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
            type="date"
            label="Fecha de Actualización"
            name="fecha_actualizacion"
            InputLabelProps={{ shrink: true }}
            value={inventario.fecha_actualizacion.toISOString().split("T")[0]}
            onChange={(e) => setInventario({ ...inventario, fecha_actualizacion: new Date(e.target.value) })}
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

export default InventarioForm;
