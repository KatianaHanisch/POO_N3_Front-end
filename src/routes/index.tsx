import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Pedidos from "../pages/Pedidos";
import TabelaPrecos from "../pages/TabelaPrecos";
import Empregados from "../pages/Empregados";
import Producao from "../pages/Producao";
import Gerente from "../pages/Gerente";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="tabelaPrecos" element={<TabelaPrecos />} />
        <Route path="usuarios" element={<Empregados />} />
        <Route path="gerente" element={<Gerente />} />
        <Route path="producao" element={<Producao />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
