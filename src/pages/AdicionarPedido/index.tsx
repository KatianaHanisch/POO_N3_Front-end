import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Select from "../../components/Select";
import api from "../../services/api";

type PedidoProps = {
  id: number;
  tipo: string;
  nome?: string;
};

export default function AdicionarPedido() {
  const [tipos, setTipos] = useState<PedidoProps[]>([]);
  const [gerentes, setGerentes] = useState<PedidoProps[]>([]);
  const [vendedores, setVendedores] = useState<PedidoProps[]>([]);
  const [producao, setProducao] = useState<PedidoProps[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  async function getTipo() {
    const { data } = await api.get("readTabelaDePrecos");
    setTipos(data);
  }

  async function getGerente() {
    const { data } = await api.get("readGerente");
    setGerentes(data);
  }

  async function getVendedor() {
    const { data } = await api.get("readEmpregado");
    setVendedores(data);
  }

  async function getProducao() {
    const { data } = await api.get("readProducao");
    setProducao(data);
  }

  useEffect(() => {
    getTipo();
    getGerente();
    getVendedor();
    getProducao();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white flex flex-col items-start p-6 justify-start h-3/4 w-8/12 rounded-lg">
        <div className="relative w-full bg-red-400">
          <div className="absolute inset-y-0 left-0 flex items-center z-40 pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            placeholderText="Selecione a data de emissão"
            dateFormat="dd/MM/yyyy"
            className=" outline-gray-600 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 "
          />
        </div>
        <Select tipo="tipo" dados={tipos} tituloSelect="Selecione o produto" />
        <Select
          tipo="nome"
          dados={gerentes}
          tituloSelect="Selecione o gerente"
        />
        <Select
          tipo="nome"
          dados={vendedores}
          tituloSelect="Selecione o vendedor"
        />
        <Select
          tipo="nome"
          dados={producao}
          tituloSelect="Selecione produção"
        />
      </div>
    </div>
  );
}
