import { useLocation } from "react-router-dom";

import SideBar from "./components/SideBar";

import AppRouter from "./routes";

export default function App() {
  const location = useLocation();

  const pagina = location.pathname;

  return (
    <>
      {pagina === "/" ? (
        <AppRouter />
      ) : (
        <div className="h-full relative ">
          <div className="hidden md:flex md:flex-col md:fixed md:w-24 md:inset-y-0 z-[80] border-2 border-r-rose-400">
            <SideBar />
          </div>
          <main className="md:pl-24 h-screen w-full bg-rose-50">
            <AppRouter />
          </main>
        </div>
      )}
    </>
  );
}
