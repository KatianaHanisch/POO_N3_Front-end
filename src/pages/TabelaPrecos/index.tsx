import { useState, useEffect } from "react";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import TituloTabela from "../../components/TituloTabela";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

type TabelaPrecosProps = {
  id: number;
  tipo: string;
  preco: number;
};

export default function TabelaPrecos() {
  const [dados, setDados] = useState<TabelaPrecosProps[]>([]);
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [precoProduto, setPrecoProduto] = useState<number | undefined>(
    undefined
  );
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);

  const tipoUsuario = sessionStorage.getItem("@Auth:TipoUsuario");

  function formatarPreco(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function fecharModalAdicionar() {
    setAbrirModalAdicionar(false);
  }

  function openModalAdicionar() {
    setAbrirModalAdicionar(true);
  }

  function confirmarModalAdicionar() {
    setAbrirModalAdicionar(false);
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

  async function getPrecos() {
    const { data } = await api.get("readTabelaDePrecos");

    setDados(data);
  }

  useEffect(() => {
    getPrecos();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TituloTabela
        tipoUsuario={tipoUsuario}
        titulo="Tabela de Preços"
        tituloButton="Adicionar produto"
        abrirModalAdicionar={openModalAdicionar}
      />
      <div className=" flex items-center justify-center w-full mt-1 ">
        <table className={`bg-white w-10/12 divide-y text-left rounded-md`}>
          <thead className={`bg-rose-500 text-base font-medium `}>
            <tr>
              <th className="px-6 py-3">Tipo produto</th>
              <th className="px-6 py-3">Preço</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className={`divide-y`}>
            {dados.map(({ tipo, preco }) => (
              <>
                <tr className={` text-sm font-medium`}>
                  <td className="px-6 py-3">{tipo}</td>
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
                    title="Editar Produto"
                    textButton="Editar"
                    confirmarModal={confirmarModalEditar}
                    cancelarModal={fecharModalEditar}
                    fecharModal={fecharModalEditar}
                  >
                    <div className="relative p-6 flex-auto">
                      <p className="mb-4 text-gray-700 text-lg ">
                        Detalhes do produto:
                      </p>
                      <Input
                        name="editar"
                        placeholder="Nome produto"
                        type="text"
                        value={nomeProduto}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNomeProduto(e.target.value)
                        }
                      />
                      <Input
                        name="editar"
                        placeholder="Preço produto"
                        type="number"
                        value={precoProduto || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPrecoProduto(Number(e.target.value))
                        }
                      />
                    </div>
                  </Modal>
                )}
                {abrirModalDeletar && (
                  <Modal
                    title="Deseja Confirmar?"
                    textButton="Remover"
                    confirmarModal={confirmarModalRemover}
                    cancelarModal={fecharModalRemover}
                    fecharModal={fecharModalRemover}
                  >
                    <div className="relative p-6 flex-auto">
                      <p className="text-gray-600 text-lg font-normal leading-relaxed">
                        Você realmente deseja remover o produto
                        <span className="font-medium text-gray-700">
                          {" "}
                          {tipo}{" "}
                        </span>
                        do sistema?
                      </p>
                    </div>
                  </Modal>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {abrirModalAdicionar && (
        <Modal
          title="Adicionar Produto"
          textButton="Adicionar"
          confirmarModal={confirmarModalAdicionar}
          cancelarModal={fecharModalAdicionar}
          fecharModal={fecharModalAdicionar}
        >
          <div className="relative p-6 flex-auto">
            <p className="mb-4 text-gray-700 text-lg ">Detalhes do produto:</p>
            <Input
              name="editar"
              placeholder="Nome produto"
              type="text"
              value={nomeProduto}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNomeProduto(e.target.value)
              }
            />
            <Input
              name="editar"
              placeholder="Preço produto"
              type="number"
              value={precoProduto || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrecoProduto(Number(e.target.value))
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
