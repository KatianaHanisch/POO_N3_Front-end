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
import { VscSearchStop } from "react-icons/vsc";

type GerenteProps = {
  id: number | undefined;
  nome: string;
  setor: string;
  salario: number | undefined;
  senha?: string;
  email?: string;
};

export default function Gerente() {
  const [dados, setDados] = useState<GerenteProps[]>([]);
  const [gerenteNome, setGerenteNome] = useState<string>("");
  const [gerenteSetor, setGerenteSetor] = useState<string>("");
  const [gerentedoSenha, setGerenteSenha] = useState<string>("");
  const [gerenteEmail, setGerenteEmail] = useState<string>("");
  const [gerenteSalario, setGerenteSalario] = useState<number | undefined>(
    undefined
  );

  const [gerenteEditando, setGerenteEditando] = useState<GerenteProps>({
    id: undefined,
    nome: "",
    setor: "",
    salario: undefined,
    email: "",
    senha: "",
  });

  const [gerenteRemover, setGerenteRemover] = useState<GerenteProps>({
    id: undefined,
    nome: "",
    setor: "",
    senha: "",
    email: "",
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
    setGerenteNome("");
    setGerenteSetor("");
    setGerenteSalario(undefined);

    setAbrirModalAdicionar(false);
  }

  function openModalAdicionar() {
    setAbrirModalAdicionar(true);
  }

  function confirmarModalAdicionar() {
    if (
      gerenteNome === "" ||
      gerenteSetor === "" ||
      gerentedoSenha === "" ||
      gerenteEmail === "" ||
      gerenteSalario === undefined
    ) {
      return;
    }

    adicionarGerente();

    setGerenteNome("");
    setGerenteSetor("");
    setGerenteSenha("");
    setGerenteEmail("");
    setGerenteSalario(undefined);

    setAbrirModalAdicionar(false);
  }

  function fecharModalEditar() {
    setAbrirModalEditar(false);
  }

  function confirmarModalEditar(id: number | undefined) {
    if (
      gerenteEditando.nome === "" ||
      gerenteEditando.senha === "" ||
      gerenteEditando.email === "" ||
      gerenteEditando.setor === "" ||
      gerenteEditando.salario === 0
    ) {
      return;
    }

    if (id !== undefined) {
      editarGerente(id);
    }

    setGerenteEditando({
      id: undefined,
      nome: "",
      setor: "",
      senha: "",
      email: "",
      salario: undefined,
    });

    setAbrirModalEditar(false);
  }

  function fecharModalRemover() {
    setAbrirModalDeletar(false);
  }

  function confirmarModalRemover(id: number | undefined) {
    if (id !== undefined) {
      removerGerente(id);
      getGerentes();
    }

    setAbrirModalDeletar(false);
  }

  async function adicionarGerente() {
    try {
      const response = await api.post("createGerente", {
        nome: gerenteNome,
        setor: gerenteSetor,
        salario: gerenteSalario,
        senha: gerentedoSenha,
        email: gerenteEmail,
      });

      if (response.status === 200) {
        setTipoSnackBar("sucesso");
        if (response.data === "Gerente cadastrado com sucesso.") {
          setMessagemSnackBar("Gerente cadastrado com sucesso");
        } else {
          setTipoSnackBar("erro");
          setMessagemSnackBar(response.data);
          setOpenSnackBar(true);
        }
        setOpenSnackBar(true);

        getGerentes();
      }
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao cadastrar o gerente");
      setOpenSnackBar(true);

      console.error("Erro ao cadastrar gerente:", error);
    }
  }

  async function editarGerente(id: number) {
    try {
      const response = await api.put(`updateGerente/${id}`, {
        nome: gerenteEditando.nome,
        setor: gerenteEditando.setor,
        salario: gerenteEditando.salario,
        senha: gerenteEditando.senha,
        email: gerenteEditando.email,
      });

      console.log(response.status);

      if (response.status == 200) {
        console.log(response.data);
        if (response.data === "Gerente atualizado com sucesso.") {
          setTipoSnackBar("sucesso");
          setMessagemSnackBar("Gerente atualizado com sucesso.");
        } else {
          setTipoSnackBar("erro");
          setMessagemSnackBar(response.data);
          setOpenSnackBar(true);
        }
        setOpenSnackBar(true);

        getGerentes();
      }
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao editar gerente");
      setOpenSnackBar(true);
      console.error("Erro ao editar gerente:", error);
    }
  }

  async function removerGerente(id: number) {
    try {
      await api.delete(`deleteGerente/${id}`);

      setTipoSnackBar("sucesso");
      setMessagemSnackBar("Gerente deletado com sucesso");
      setOpenSnackBar(true);

      getGerentes();
    } catch (error) {
      setTipoSnackBar("erro");
      setMessagemSnackBar("Ocorreu um erro ao deletar gerente");
      setOpenSnackBar(true);
      console.error("Erro ao editar gerente:", error);
    }
  }

  async function getGerentes() {
    try {
      const { data } = await api.get("readGerente");

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
    getGerentes();
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
            titulo="Gerentes"
            tituloButton="Adicionar gerente"
            abrirModalAdicionar={openModalAdicionar}
          />
          <div className=" flex items-center justify-center w-full mt-1 ">
            {dados.length === 0 ? (
              <div className="flex items-center justify-center flex-col w-full h-96 ">
                <VscSearchStop color="#565656" size={35} />
                <p className="text-gray-500 text-lg">
                  Nenhum gerente encontrado
                </p>
              </div>
            ) : (
              <table
                className={`bg-white w-10/12 divide-y text-left rounded-md`}
              >
                <thead className={`bg-rose-500 text-base font-medium `}>
                  <tr>
                    <th className="px-6 py-3">Nome</th>
                    <th className="px-6 py-3">Setor</th>
                    <th className="px-6 py-3">Salário</th>
                    <th className="px-6 py-3">E-mail</th>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className={`divide-y`}>
                  {dados.map(({ id, nome, setor, salario, senha, email }) => (
                    <React.Fragment key={id}>
                      <tr className={` text-sm font-medium`}>
                        <td className="px-6 py-3">{nome}</td>
                        <td className="px-6 py-3">{setor}</td>
                        <td className="px-6 py-3">
                          {formatarSalario(salario)}
                        </td>
                        <td className="px-6 py-3">{email}</td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => {
                              setAbrirModalEditar(true);
                              setGerenteEditando({
                                id: id,
                                nome: nome,
                                salario: salario,
                                setor: setor,
                                email: email,
                                senha: senha,
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
                              setGerenteRemover({
                                id: id,
                                nome: nome,
                                salario: salario,
                                setor: setor,
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
            )}
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
              title="Adicionar Gerente"
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
                  placeholder="Nome gerente"
                  type="text"
                  value={gerenteNome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteNome(e.target.value)
                  }
                />
                <Input
                  name="editar"
                  placeholder="Setor gerente"
                  type="text"
                  value={gerenteSetor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteSetor(e.target.value)
                  }
                />
                <Input
                  name="editar"
                  placeholder="Salário gerente"
                  type="number"
                  value={gerenteSalario || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteSalario(Number(e.target.value))
                  }
                />
                <Input
                  name="editar"
                  placeholder="E-mail gerente"
                  type="text"
                  value={gerenteEmail || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEmail(String(e.target.value))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Senha gerente"
                  type="password"
                  value={gerentedoSenha || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteSenha(String(e.target.value))
                  }
                />
              </div>
            </Modal>
          )}
          {abrirModalEditar && (
            <Modal
              title="Editar Gerente"
              textButton="Editar"
              confirmarModal={() => confirmarModalEditar(gerenteEditando.id)}
              cancelarModal={fecharModalEditar}
              fecharModal={fecharModalEditar}
            >
              <div className="relative p-6 flex-auto">
                <p className="mb-4 text-gray-700 text-lg ">
                  Detalhes do gerente:
                </p>
                <Input
                  name="editar"
                  placeholder="Nome"
                  type="text"
                  value={gerenteEditando.nome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      nome: e.target.value,
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Setor"
                  type="text"
                  value={gerenteEditando.setor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      setor: e.target.value,
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Salario gerente"
                  type="number"
                  value={gerenteEditando.salario || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      salario: Number(e.target.value),
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Email gerente"
                  type="text"
                  value={gerenteEditando.email || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      email: String(e.target.value),
                    }))
                  }
                />
                <Input
                  name="editar"
                  placeholder="Senha gerente"
                  type="password"
                  value={gerenteEditando.senha || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGerenteEditando((prevEmpregadoEditando) => ({
                      ...prevEmpregadoEditando,
                      senha: String(e.target.value),
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
              confirmarModal={() => confirmarModalRemover(gerenteRemover.id)}
              cancelarModal={fecharModalRemover}
              fecharModal={fecharModalRemover}
            >
              <div className="relative p-6 flex-auto">
                <p className="text-gray-600 text-lg font-normal leading-relaxed">
                  Você realmente deseja remover o usuário
                  <span className="font-medium text-gray-700">
                    {" "}
                    {gerenteRemover.nome}{" "}
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
