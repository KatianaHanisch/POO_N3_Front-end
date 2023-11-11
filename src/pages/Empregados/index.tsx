import React, { useState, useEffect } from "react";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import TituloTabela from "../../components/TituloTabela";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

type EmpregadoProps = {
  id: number | undefined;
  nome: string;
  funcao: string;
  salario: number | undefined;
};

export default function Empregados() {
  const [dados, setDados] = useState<EmpregadoProps[]>([]);
  const [empregadoNome, setEmpregadoNome] = useState<string>("");
  const [empregadoFuncao, setEmpregadoFuncao] = useState<string>("");
  const [empregadoSalario, setEmpregadoSalario] = useState<number | undefined>(
    undefined
  );

  const [empregadoEditando, setEmpregadoEditando] = useState<EmpregadoProps>({
    id: undefined,
    nome: "",
    funcao: "",
    salario: undefined,
  });

  const [empregadoRemover, setEmpregadoRemover] = useState<EmpregadoProps>({
    id: undefined,
    nome: "",
    funcao: "",
    salario: undefined,
  });

  const [messagemSnackBar, setMessagemSnackBar] = useState<string>("");
  const [tipoSnackBar, setTipoSnackBar] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const [carregando, setCarregando] = useState<boolean>(true);
  const [abrirModalAdicionar, setAbrirModalAdicionar] =
    useState<boolean>(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState<boolean>(false);
  const [abrirModalDeletar, setAbrirModalDeletar] = useState<boolean>(false);

  function formatarSalario(valor: number | undefined) {
    if (valor === undefined) {
      return "";
    }

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  function fecharModalAdicionar() {
    setEmpregadoNome("");
    setEmpregadoFuncao("");
    setEmpregadoSalario(undefined);

    setAbrirModalAdicionar(false);
  }

  function openModalAdicionar() {
    setAbrirModalAdicionar(true);
  }

  function confirmarModalAdicionar() {
    if (
      empregadoNome === "" ||
      empregadoFuncao === "" ||
      empregadoSalario === undefined
    ) {
      return;
    }

    adicionarEmpregado();

    setEmpregadoNome("");
    setEmpregadoFuncao("");
    setEmpregadoSalario(undefined);

    setAbrirModalAdicionar(false);
  }

  function fecharModalEditar() {
    setAbrirModalEditar(false);
  }

  function confirmarModalEditar(id: number | undefined) {
    if (
      empregadoEditando.nome === "" ||
      empregadoEditando.funcao === "" ||
      empregadoEditando.salario === 0
    ) {
      return;
    }

    if (id !== undefined) {
      editarProduto(id);
    }

    setEmpregadoEditando({
      id: undefined,
      nome: "",
      funcao: "",
      salario: undefined,
    });

    setAbrirModalEditar(false);
  }

  function fecharModalRemover() {
    setAbrirModalDeletar(false);
  }

  function confirmarModalRemover(id: number | undefined) {
    if (id !== undefined) {
      removerEmpregado(id);
      getEmpregados();
    }

    setAbrirModalDeletar(false);
  }

  async function adicionarEmpregado() {
    try {
      await api.post("createEmpregado", {
        nome: empregadoNome,
        funcao: empregadoFuncao,
        salario: empregadoSalario,
      });

      setTipoSnackBar("sucesso");
      setMessagemSnackBar("Empregado cadastrado com sucesso");
      setOpenSnackBar(true);

      getEmpregados();
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao cadastrar o empregado");
      setOpenSnackBar(true);

      console.error("Erro ao cadastrar empregado:", error);
    }
  }

  async function editarProduto(id: number) {
    try {
      await api.put(`updateEmpregado/${id}`, {
        nome: empregadoEditando.nome,
        funcao: empregadoEditando.funcao,
        salario: empregadoEditando.salario,
      });

      setTipoSnackBar("sucesso");
      setMessagemSnackBar("Empregado editado com sucesso");
      setOpenSnackBar(true);

      getEmpregados();
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao editar empregado");
      setOpenSnackBar(true);
      console.error("Erro ao editar empregado:", error);
    }
  }

  async function removerEmpregado(id: number) {
    try {
      await api.delete(`deleteEmpregado/${id}`);

      setTipoSnackBar("sucesso");
      setMessagemSnackBar("Empregado deletado com sucesso");
      setOpenSnackBar(true);

      getEmpregados();
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao deletar empregado");
      setOpenSnackBar(true);
      console.error("Erro ao editar empregado:", error);
    }
  }

  async function getEmpregados() {
    try {
      const { data } = await api.get("readEmpregado");

      setDados(data);
      setCarregando(false);
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao carregar os dados");
      setOpenSnackBar(true);

      console.log(error);

      setCarregando(false);
    }
  }

  useEffect(() => {
    getEmpregados();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      {carregando ? (
        <div className="flex items-center justify-center w-full h-full">
          <CircularProgress color="inherit" size={45} />
        </div>
      ) : (
        <>
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
                {dados.map(({ id, nome, funcao, salario }) => (
                  <React.Fragment key={id}>
                    <tr className={` text-sm font-medium`}>
                      <td className="px-6 py-3">{nome}</td>
                      <td className="px-6 py-3">{funcao}</td>
                      <td className="px-6 py-3">{formatarSalario(salario)}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => {
                            setAbrirModalEditar(true);
                            setEmpregadoEditando({
                              id: id,
                              nome: nome,
                              salario: salario,
                              funcao: funcao,
                            });
                          }}
                          className="p-1 hover:bg-rose-200 rounded-full transition"
                        >
                          <MdModeEditOutline size={21} color="#374151" />
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => {
                            setAbrirModalDeletar(true);
                            setEmpregadoRemover({
                              id: id,
                              nome: nome,
                              salario: salario,
                              funcao: funcao,
                            });
                          }}
                          className="p-1 hover:bg-rose-200 rounded-full transition "
                        >
                          <BiSolidTrash size={21} color="#374151" />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {openSnackBar && (
            <Snackbar
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={tipoSnackBar === "sucesso" ? "success" : "error"}
                sx={{ width: "100%" }}
              >
                {messagemSnackBar}
              </Alert>
            </Snackbar>
          )}
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
          {abrirModalEditar && (
            <Modal
              title="Editar Empregado"
              textButton="Editar"
              confirmarModal={() => confirmarModalEditar(empregadoEditando.id)}
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
                  value={empregadoEditando.nome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmpregadoEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      nome: e.target.value,
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Função"
                  type="text"
                  value={empregadoEditando.funcao}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmpregadoEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      funcao: e.target.value,
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Salario empregado"
                  type="number"
                  value={empregadoEditando.salario || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmpregadoEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      salario: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </Modal>
          )}
          {abrirModalDeletar && (
            <Modal
              title="Deseja confirmar?"
              textButton="Remover"
              confirmarModal={() => confirmarModalRemover(empregadoRemover.id)}
              cancelarModal={fecharModalRemover}
              fecharModal={fecharModalRemover}
            >
              <div className="relative p-6 flex-auto">
                <p className="text-gray-600 text-lg font-normal leading-relaxed">
                  Você realmente deseja remover o usuário
                  <span className="font-medium text-gray-700">
                    {" "}
                    {empregadoRemover.nome}{" "}
                  </span>
                  do sistema?
                </p>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
