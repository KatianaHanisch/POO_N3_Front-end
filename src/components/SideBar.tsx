import { AiOutlineHome, AiOutlineDollarCircle } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { TbFiles } from "react-icons/tb";

import { BiSolidData } from "react-icons/bi";

import { useLocation } from "react-router-dom";

const rotasGerente = [
  {
    Icone: AiOutlineHome,
    href: "/home",
  },
  {
    Icone: AiOutlineDollarCircle,
    href: "/tabelaPrecos",
  },
  {
    Icone: FiUsers,
    href: "/usuarios",
  },
  {
    Icone: BiSolidData,
    href: "/setor",
  },
];

const rotasEmpregado = [
  {
    Icone: AiOutlineHome,
    href: "/home",
  },
  {
    Icone: AiOutlineDollarCircle,
    href: "/tabelaPrecos",
  },
  {
    Icone: TbFiles,
    href: "/pedidos",
  },
];

export default function SideBar() {
  const tipoUsuario: "empregado" | "gerente" = "gerente";

  const location = useLocation();

  return (
    <div className={`space-y-4 py-4 flex flex-col h-full bg-rose-50`}>
      <div className="h-5/6 flex items-center justify-center">
        <div className="flex flex-col h-3/4 justify-evenly">
          {tipoUsuario === "gerente" ? (
            <>
              {rotasGerente.map(({ href, Icone }) => {
                const isActive = location.pathname === href;

                return (
                  <a key={href} href={href}>
                    <div
                      className={`h-12 w-12 flex items-center justify-center p-1 transition rounded-full hover:bg-rose-400 ${
                        isActive
                          ? "bg-rose-500 hover:bg-rose-500 transition"
                          : ""
                      }`}
                    >
                      <Icone className="h-7 w-7" color="#313131" />
                    </div>
                  </a>
                );
              })}
            </>
          ) : (
            <>
              {rotasEmpregado.map(({ href, Icone }) => {
                const isActive = location.pathname === href;

                return (
                  <a key={href} href={href}>
                    <div
                      className={`h-12 w-12 flex items-center justify-center p-1 transition rounded-full hover:bg-rose-400 ${
                        isActive
                          ? "bg-rose-500 hover:bg-rose-500 transition"
                          : ""
                      }`}
                    >
                      <Icone className="h-7 w-7" color="#313131" />
                    </div>
                  </a>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}