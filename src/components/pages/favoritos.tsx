import { useNavigate } from "react-router";
import { Cards } from "../cards";
import type { Character } from "../../model/characters";
import { Button } from "flowbite-react";

export const Favoritos = () => {
  const fav = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  ) as Character[];

  const navigate = useNavigate();

  const charClicked = (id: number) => {
    navigate(`/character/${id}`, {
      state: {
        data: fav.find((ch) => ch.id === id),
      },
    });
  };

  return (
    <>
      <Button className="m-4" color="red" onClick={() => navigate(-1)}>
        Volver
      </Button>
      {fav.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl dark:text-white">
            No hay personajes favoritos
          </h1>
          <Button onClick={() => navigate("/")}>Explorar personajes</Button>
        </div>
      ) : (
        <Cards ch={fav} charClicked={charClicked} />
      )}
    </>
  );
};
