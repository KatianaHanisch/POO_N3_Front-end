import { useState, useEffect } from "react";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import TituloTabela from "../../components/TituloTabela";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

type TabelaPrecosProps = {
  id: number;
  nome: string;
  funcao: string;
};

export default function Producao() {
  const [dados, setDados] = useState<TabelaPrecosProps[]>([]);
  const [nomeColaborador, setNomeColaborador] = useState<string>("");
  const [funcaoColaborador, setFuncaoColaborador] = useState<string>("");
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);

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
    const { data } = await api.get("readProducao");

    setDados(data);
  }

  useEffect(() => {
    getPrecos();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TituloTabela
        titulo="Setor de Produção"
        tituloButton="Adicionar colaborador"
        abrirModalAdicionar={openModalAdicionar}
      />
      <div className=" flex items-center justify-center w-full mt-1 ">
        <table className={`bg-white w-10/12 divide-y text-left rounded-md`}>
          <thead className={`bg-rose-500 text-base font-medium `}>
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Função</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className={`divide-y`}>
            {dados.map(({ nome, funcao }, index) => (
              <>
                <tr key={index} className={` text-sm font-medium`}>
                  <td className="px-6 py-3">{nome}</td>
                  <td className="px-6 py-3">{funcao}</td>
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
                    {console.log(index + " " + nome)}
                    <Modal
                      title="Deseja Confirmar?"
                      textButton="Remover"
                      confirmarModal={confirmarModalRemover}
                      cancelarModal={fecharModalRemover}
                      fecharModal={fecharModalRemover}
                    >
                      <div className="relative p-6 flex-auto">
                        <p className="text-gray-600 text-lg font-normal leading-relaxed">
                          Você realmente deseja remover o colaborador
                          <span className="font-medium text-gray-700">
                            {" "}
                            {nome}{" "}
                          </span>
                          do sistema?
                        </p>
                      </div>
                    </Modal>
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {abrirModalAdicionar && (
        <Modal
          title="Adicionar Produto"
          textButton="Adionar"
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
              value={nomeColaborador}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNomeColaborador(e.target.value)
              }
            />
            <Input
              name="editar"
              placeholder="Preço produto"
              type="text"
              value={funcaoColaborador}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFuncaoColaborador(e.target.value)
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
