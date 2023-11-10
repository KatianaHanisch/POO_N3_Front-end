import { useState } from "react";

type PedidoProps = {
  id: number;
  tipo: string;
  nome?: string;
};

type SelectProps = {
  dados: PedidoProps[];
  tituloSelect: string;
  tipo: string;
  onChange?: (value: number | null) => void;
};

export default function Select({
  dados,
  tituloSelect,
  tipo,
  onChange,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue !== "" ? Number(selectedValue) : null);

    if (onChange) {
      onChange(selectedValue !== "" ? Number(selectedValue) : null);
    }
  };

  return (
    <div className="flex w-full items-center gap-3">
      <select
        value={selectedValue || ""}
        onChange={handleChange}
        className="bg-gray-50 mt-4 border outline-gray-400 border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      >
        <option value="" disabled>
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
