import { useState, useEffect } from "react";

import api from "../../services/api";

type DadosProps = {
  id: number;
  nome: string;
  setor: string;
};

export default function Home() {
  const [gerente, setGerente] = useState<DadosProps[]>([]);

  async function getDados() {
    const { data } = await api.get("readGerente");

    setGerente(data);
  }

  useEffect(() => {
    getDados();
  }, []);

  console.log(gerente);

  return (
    <section className="w-full h-screen flex items-center justify-center ">
      <h1>Home</h1>
    </section>
  );
}
