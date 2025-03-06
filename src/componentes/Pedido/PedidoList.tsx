import { useEffect, useState } from "react";
import { getPedidos, deletePedido } from "./api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Pedido {
  id_pedido: number;
  id_empresa: number;
  fecha_solicitud: string;
  fecha_entrega: string;
  estado: string;
}

const PedidoList = ({ onEdit }: { onEdit: (pedido: Pedido) => void }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    const data = await getPedidos();
    setPedidos(data);
  };

  const handleDeleteClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedPedido) {
      await deletePedido(selectedPedido.id_pedido);
      fetchPedidos();
    }
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Fecha Solicitud</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id_pedido}>
                <TableCell>{pedido.id_pedido}</TableCell>
                <TableCell>{pedido.id_empresa}</TableCell>
                <TableCell>{pedido.fecha_solicitud}</TableCell>
                <TableCell>{pedido.fecha_entrega}</TableCell>
                <TableCell>{pedido.estado}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(pedido)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(pedido)} sx={{ marginLeft: 1 }}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmación de Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este pedido?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PedidoList;