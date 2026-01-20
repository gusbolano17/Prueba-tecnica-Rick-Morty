import { Button, Pagination, Spinner } from "flowbite-react";
import { Cards } from "../cards";
import { Filtros } from "../filtros";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetching } from "../../hooks/useFetching";
import { BASE_URL, getCharacters } from "../../services/ricky-morty-service";
import type { Character } from "../../model/characters";

export const Characters = () => {
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const navigate = useNavigate();

  let { data, error, loading } = useFetching<Character[]>(
    `${BASE_URL}?page=${paginaActual}&name=${search}&status=${status}&species=${species}`,
    getCharacters
  );

  const charClicked = (id: number) => {
    navigate(`/character/${id}`, {
      state: {
        data: data?.find((ch) => ch.id === id),
      },
    });
  };

  const paginar = (pagina: number) => {
    setPaginaActual(pagina);
  };

  const filteredItems = useMemo(() => {
    return data?.filter((it) => {
      const matchesSearch = it.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesStatus = status
        ? it.status.toLowerCase() === status.toLowerCase()
        : true;
      const matchesSpecies = species
        ? it.species.toLowerCase().includes(species.toLowerCase())
        : true;

      return matchesSearch && matchesStatus && matchesSpecies;
    });
  }, [data, debouncedSearch, status, species]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500 text-xl">Error al cargar los datos</p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">No hay datos disponibles</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <Filtros
        search={search}
        estado={status}
        species={species}
        onSearch={setSearch}
        onStatusChange={setStatus}
        onSpecies={setSpecies}
      />
      <Cards ch={filteredItems} charClicked={charClicked} />
      <div className="col-span-4 flex justify-center overflow-x-auto">
        <Pagination
          currentPage={paginaActual}
          totalPages={100}
          onPageChange={paginar}
        />
      </div>
    </div>
  );
};
