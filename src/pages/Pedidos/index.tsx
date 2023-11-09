import { useState, useEffect } from "react";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import TituloTabela from "../../components/TituloTabela";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

type PedidosProps = {
  id: number;
  dataEmissao: string;
  dataFinalizacao: string;
  preco: number;
  tipo: string;
  gerenteResponsavel: string;
  vendedorResponsavel: string;
  producaoResponsavel: string;
};

export default function Pedidos() {
  const [dados, setDados] = useState<PedidosProps[]>([]);
  const [nomeColaborador, setNomeColaborador] = useState<string>("");
  const [funcaoColaborador, setFuncaoColaborador] = useState<string>("");
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);

  const tipoUsuario = sessionStorage.getItem("@Auth:TipoUsuario");

  function formatarPreco(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function fecharModalEditar() {
    setAbrirModalEditar(false);
  }

  function confirmarModalEditar() {
    setAbrirModalEditar(false);
  }

  function fecharModalRemover() {
    setAbrirModalDeletar(false);
  }

  function confirmarModalRemover() {
    setAbrirModalDeletar(false);
  }

  async function getPedidos() {
    const { data } = await api.get("readPedido");

    setDados(data);
  }

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TituloTabela tipoUsuario={tipoUsuario} titulo="Pedidos" button={false} />
      <div className=" flex items-center justify-center w-full mt-1 ">
        <table className={`bg-white w-10/12 divide-y text-left rounded-md`}>
          <thead className={`bg-rose-500 text-base font-medium `}>
            <tr>
              <th className="px-6 py-3">id</th>
              <th className="px-6 py-3">Data Emissão</th>
              <th className="px-6 py-3">Data Finalização</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Vendedor</th>
              <th className="px-6 py-3">Produção</th>
              <th className="px-6 py-3">Valor</th>
              {tipoUsuario === "empregado" ? null : (
                <>
                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3"></th>
                </>
              )}
            </tr>
          </thead>
          <tbody className={`divide-y`}>
            {dados.map(
              (
                {
                  id,
                  dataEmissao,
                  dataFinalizacao,
                  tipo,
                  vendedorResponsavel,
                  producaoResponsavel,
                  preco,
                },
                index
              ) => (
                <>
                  <tr key={index} className={` text-sm font-medium`}>
                    <td className="px-6 py-3">{id}</td>
                    <td className="px-6 py-3">{dataEmissao}</td>
                    <td className="px-6 py-3">{dataFinalizacao}</td>
                    <td className="px-6 py-3">{tipo}</td>
                    <td className="px-6 py-3">{vendedorResponsavel}</td>
                    <td className="px-6 py-3">{producaoResponsavel}</td>
                    <td className="px-6 py-3">{formatarPreco(preco)}</td>
                    {tipoUsuario === "empregado" ? null : (
                      <>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => setAbrirModalEditar(true)}
                            className="p-1 hover:bg-rose-200 rounded-full transition"
                          >
                            <MdModeEditOutline size={21} color="#374151" />
                          </button>
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => setAbrirModalDeletar(true)}
                            className="p-1 hover:bg-rose-200 rounded-full transition "
                          >
                            <BiSolidTrash size={21} color="#374151" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                  {abrirModalEditar && (
                    <Modal
                      title="Editar colaborador"
                      textButton="Editar"
                      confirmarModal={confirmarModalEditar}
                      cancelarModal={fecharModalEditar}
                      fecharModal={fecharModalEditar}
                    >
                      <div className="relative p-6 flex-auto">
                        <p className="mb-4 text-gray-700 text-lg ">
                          Detalhes do colaborador:
                        </p>
                        <Input
                          name="editar"
                          placeholder="Nome do colaborador"
                          type="text"
                          value={nomeColaborador}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNomeColaborador(e.target.value)
                          }
                        />
                        <Input
                          name="editar"
                          placeholder="Função do colaborador"
                          type="number"
                          value={funcaoColaborador}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFuncaoColaborador(e.target.value)
                          }
                        />
                      </div>
                    </Modal>
                  )}
                  {abrirModalDeletar && (
                    <>
                      <Modal
                        title="Deseja Confirmar?"
                        textButton="Remover"
                        confirmarModal={confirmarModalRemover}
                        cancelarModal={fecharModalRemover}
                        fecharModal={fecharModalRemover}
                      >
                        <div className="relative p-6 flex-auto">
                          <p className="text-gray-600 text-lg font-normal leading-relaxed">
                            Você realmente deseja remover o pedido
                            <span className="font-medium text-gray-700">
                              {" "}
                              {id}{" "}
                            </span>
                            do sistema?
                          </p>
                        </div>
                      </Modal>
                    </>
                  )}
                </>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
