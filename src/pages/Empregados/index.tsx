import { useState, useEffect } from "react";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import TituloTabela from "../../components/TituloTabela";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

type EmpregadoProps = {
  id: number;
  nome: string;
  funcao: string;
  salario: number;
};

export default function Empregados() {
  const [dados, setDados] = useState<EmpregadoProps[]>([]);
  const [empregadoNome, setEmpregadoNome] = useState<string>("");
  const [empregadoFuncao, setEmpregadoFuncao] = useState<string>("");
  const [empregadoSalario, setEmpregadoSalario] = useState<number | undefined>(
    undefined
  );
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);

  function formatarSalario(valor: number) {
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

  async function getEmpregados() {
    const { data } = await api.get("readEmpregado");

    setDados(data);
  }

  useEffect(() => {
    getEmpregados();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TituloTabela
        titulo="Empregados"
        tituloButton="Adicionar empregado"
        abrirModalAdicionar={openModalAdicionar}
      />
      <div className=" flex items-center justify-center w-full mt-1 ">
        <table className={`bg-white w-10/12 divide-y text-left rounded-md`}>
          <thead className={`bg-rose-500 text-base font-medium `}>
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Função</th>
              <th className="px-6 py-3">Salário</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className={`divide-y`}>
            {dados.map(({ nome, funcao, salario }) => (
              <>
                <tr className={` text-sm font-medium`}>
                  <td className="px-6 py-3">{nome}</td>
                  <td className="px-6 py-3">{funcao}</td>
                  <td className="px-6 py-3">{formatarSalario(salario)}</td>
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
                        Detalhes do empregado:
                      </p>
                      <Input
                        name="editar"
                        placeholder="Nome"
                        type="text"
                        value={empregadoNome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmpregadoNome(e.target.value)
                        }
                      />
                      <Input
                        name="editar"
                        placeholder="Função"
                        type="text"
                        value={empregadoFuncao}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmpregadoFuncao(e.target.value)
                        }
                      />
                    </div>
                  </Modal>
                )}
                {abrirModalDeletar && (
                  <Modal
                    title="Deseja confirmar?"
                    textButton="Remover"
                    confirmarModal={confirmarModalRemover}
                    cancelarModal={fecharModalRemover}
                    fecharModal={fecharModalRemover}
                  >
                    <div className="relative p-6 flex-auto">
                      <p className="text-gray-600 text-lg font-normal leading-relaxed">
                        Você realmente deseja remover o usuário
                        <span className="font-medium text-gray-700">
                          {" "}
                          {nome}{" "}
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
          title="Adicionar Empregado"
          textButton="Adicionar"
          confirmarModal={confirmarModalAdicionar}
          cancelarModal={fecharModalAdicionar}
          fecharModal={fecharModalAdicionar}
        >
          <div className="relative p-6 flex-auto">
            <p className="mb-4 text-gray-700 text-lg ">
              Adicionar informações:
            </p>
            <Input
              name="editar"
              placeholder="Nome empregado"
              type="text"
              value={empregadoNome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmpregadoNome(e.target.value)
              }
            />
            <Input
              name="editar"
              placeholder="Função empregado"
              type="text"
              value={empregadoFuncao}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmpregadoFuncao(e.target.value)
              }
            />
            <Input
              name="editar"
              placeholder="Salário empregado"
              type="number"
              value={empregadoSalario || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmpregadoSalario(Number(e.target.value))
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
