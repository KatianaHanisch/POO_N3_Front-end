import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";

import Login from "../pages/Login";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
