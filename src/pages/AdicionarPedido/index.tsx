import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Select from "../../components/Select";
import Input from "../../components/Input";

import api from "../../services/api";

type PedidoProps = {
  id: number;
  tipo: string;
  nome?: string;
};

export default function AdicionarPedido() {
  const [dataEmissao, setDataEmissao] = useState<string | null>(null);
  const [tipos, setTipos] = useState<PedidoProps[]>([]);
  const [gerentes, setGerentes] = useState<PedidoProps[]>([]);
  const [vendedores, setVendedores] = useState<PedidoProps[]>([]);
  const [producao, setProducao] = useState<PedidoProps[]>([]);
  const [quantidade, setQuantidade] = useState<number | undefined>(undefined);

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
      <div className="bg-rose-400 flex flex-col items-center p-12 justify-start  w-10/12 rounded-lg">
        <div className="bg-white w-full px-14 py-6 flex items-center flex-col rounded-lg">
          <h1 className="font-semibold text-2xl">Adicionar Pedido</h1>
          <div className="flex flex-col w-full mt-5 ">
            <div className="relative w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Data de Emissão"
                    format="DD/MM/YYYY"
                    value={dataEmissao || null}
                    onChange={(newValue) => setDataEmissao(newValue)}
                    className="mt-4 border outline-gray-400 border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <Select
              tipo="tipo"
              dados={tipos}
              tituloSelect="Selecione o produto"
            />
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
            <Input
              name="quantidade"
              placeholder="Digite a quantidade do produto"
              type="number"
              value={quantidade}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantidade(Number(e.target.value))
              }
            />
            <div className="flex w-full  items-center justify-end pt-6">
              <button className="flex items-center justify-center bg-rose-600 hover:bg-rose-700 transition rounded-md px-10 py-2 font-semibold text-gray-200 text-md">
                Criar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
