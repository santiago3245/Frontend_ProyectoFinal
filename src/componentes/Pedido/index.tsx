import { useState } from "react";
import PedidoList from "./PedidoList";
import PedidoForm from "./PedidoForm";
import { Container, Typography, Box } from "@mui/material";

interface Pedido {
  id_pedido?: number;
  id_empresa: number;
  fecha_solicitud: string;
  fecha_entrega: string;
  estado: string;
}

const PedidoPage = () => {
  const [pedidoEdit, setPedidoEdit] = useState<Pedido | null>(null);

  const refreshList = () => {
    setPedidoEdit(null);
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" align="center">
          Gestión de Pedidos
        </Typography>
      </Box>
      <PedidoForm pedidoEdit={pedidoEdit} onSave={refreshList} />
      <PedidoList onEdit={setPedidoEdit} />
    </Container>
  );
};

export default PedidoPage;