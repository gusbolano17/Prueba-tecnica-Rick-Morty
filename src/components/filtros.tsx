import { Select, TextInput } from "flowbite-react";
import {type FC } from "react";

interface FiltrosProps {
  search: string;
  estado: string;
  species: string;
  onSearch: (search: string) => void;
  onStatusChange: (status: string) => void;
  onSpecies: (species: string) => void;
}

export const Filtros: FC<FiltrosProps> = ({
  search,
  estado,
  species,
  onSearch,
  onStatusChange,
  onSpecies,
}) => {
  return (
    <div className="flex gap-4 p-4">
      <TextInput
        placeholder="buscar por nombre"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select value={estado} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">Select estatus</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </Select>
      <TextInput
        placeholder="buscar por especie"
        value={species}
        onChange={(e) => onSpecies(e.target.value)}
      />
    </div>
  );
};
