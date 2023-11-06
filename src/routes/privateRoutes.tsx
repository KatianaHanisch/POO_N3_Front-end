import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const userid = sessionStorage.getItem("@Auth:token") == null ? true : true;
  return <>{userid ? <Outlet /> : <Navigate to="/" />}</>;
}
