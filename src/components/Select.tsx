type PedidoProps = {
  id: number;
  tipo: string;
  nome?: string;
};

type SelectProps = {
  dados: PedidoProps[];
  tituloSelect: string;
  tipo: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  dados,
  tituloSelect,
  tipo,
  onChange,
}: SelectProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <select
        onChange={onChange}
        className="bg-gray-50 mt-4 border outline-gray-400 border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      >
        <option defaultValue="" disabled selected>
          {tituloSelect}
        </option>

        {dados.map((item) => (
          <option key={item.id} value={item.id}>
            {tipo === "nome" ? item.nome : item.tipo}
          </option>
        ))}
      </select>
    </div>
  );
}
