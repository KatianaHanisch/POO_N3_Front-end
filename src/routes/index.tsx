import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Pedidos from "../pages/Pedidos";
import TabelaPrecos from "../pages/TabelaPrecos";
import Usuarios from "../pages/Usuarios";
import Setor from "../pages/Setor";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="tabelaPrecos" element={<TabelaPrecos />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="setor" element={<Setor />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
