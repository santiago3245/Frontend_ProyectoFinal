import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RolPage from "./componentes/Rol";
import UsuarioPage from "./componentes/Usuario";
import EmpresaPage from "./componentes/Empresa"; 
import CategoriaPage from "./componentes/Categorias";
import Navbar from "./componentes/navbar/Navbar";

import './App.css';
import ProveedorPage from "./componentes/Proveedor";
import InventarioPage from "./componentes/Inventario";
import UsuarioRolPage from "./componentes/Usuarios_Rol";
import ProductoPage from "./componentes/Producto";
import PedidoPage from "./componentes/Pedido";
import ReportePage from "./componentes/Reporte";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/roles" element={<RolPage />} />
        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/empresas" element={<EmpresaPage />} />
        <Route path="/categorias" element={<CategoriaPage />} />
        <Route path="/proveedores" element={< ProveedorPage />} />
        <Route path="/inventarios" element={< InventarioPage />} />
        <Route path="/usuariosrol" element={< UsuarioRolPage />} />
        <Route path="/productos" element={<ProductoPage />} />
        <Route path="/pedidos" element={<PedidoPage/>}/>
        <Route path="/reportes" element={<ReportePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
