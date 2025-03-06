import { useState, useEffect } from "react";
import { createPedido, updatePedido } from "./api";
import { getEmpresas } from "../Empresa/api";
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface Pedido {
  id_pedido?: number;
  id_empresa: number;
  fecha_solicitud: string;
  fecha_entrega: string;
  estado: string;
}

interface Empresa {
  id_empresa: number;
  nombre: string;
}

const PedidoForm = ({ pedidoEdit, onSave }: { pedidoEdit: Pedido | null; onSave: () => void }) => {
  const [pedido, setPedido] = useState<Pedido>({
    id_empresa: 0,
    fecha_solicitud: "",
    fecha_entrega: "",
    estado: "",
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    if (pedidoEdit) setPedido(pedidoEdit);
    fetchEmpresas();
  }, [pedidoEdit]);

  const fetchEmpresas = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pedido.id_pedido) {
      await updatePedido(pedido.id_pedido, pedido);
    } else {
      await createPedido(pedido);
    }
    onSave(); // Actualizar lista
    setPedido({
      id_empresa: 0,
      fecha_solicitud: "",
      fecha_entrega: "",
      estado: "",
    }); // Resetear formulario
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {pedido.id_pedido ? "Editar Pedido" : "Nuevo Pedido"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Empresa</InputLabel>
            <Select
              name="id_empresa"
              value={pedido.id_empresa}
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
            label="Fecha Solicitud"
            name="fecha_solicitud"
            type="date"
            value={pedido.fecha_solicitud}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Fecha Entrega"
            name="fecha_entrega"
            type="date"
            value={pedido.fecha_entrega}
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
            value={pedido.estado}
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

export default PedidoForm;