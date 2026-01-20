import { Button, ButtonGroup, Modal, ModalHeader } from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Episode } from "../../model/episodes";
import { getEpisodes } from "../../services/ricky-morty-service";
import type { Character } from "../../model/characters";

export const Personaje: FC = () => {
  const {
    state: { data },
  } = useLocation();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<Character[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getEpisodes(data.episode)
      .then((resp) => {
        setEpisodes(Array.isArray(resp) ? resp : [resp]);
      })
      .catch((err) => setError(err));
  }, [data]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favs) setFavorites(favs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFav = (item : any) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === item.id)
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item]
    );
    navigate(-1);
  };

  const isFavorite = (id : number) => favorites.some((fav) => fav.id === id);

  return (
    <Modal
      show={true}
      size="7xl"
      popup={true}
      onClose={() => window.history.back()}
    >
      <ModalHeader>
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex items-center gap-4">
            <img
              src={data.image}
              alt={data.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {data.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.species} • {data.gender}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: {data.status}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-1 space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              <span className="font-medium">Origin: </span>
              {data.origin.name}
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              <span className="font-medium">Location: </span>
              {data.location.name}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-72 overflow-auto">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Episodes
            </h4>

            {error && (
              <p className="text-sm text-red-500">Error: {String(error)}</p>
            )}

            {(!episodes || episodes.length === 0) && !error ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cargando episodios...
              </p>
            ) : (
              <ul className="space-y-3">
                {(Array.isArray(episodes) ? episodes : [episodes]).map((ep) => (
                  <li
                    key={ep.id}
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    <span className="font-medium">{ep.episode}</span> —{" "}
                    {ep.name}
                    <span className="text-xs text-gray-400">
                      {" "}
                      ({ep.air_date})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <ButtonGroup>
          <Button onClick={() => window.history.back()} color="red">
            Cerrar
          </Button>
          <Button 
          color={isFavorite(data.id) ? "yellow" : "purple"} 
          onClick={() => toggleFav(data)}
          >
            {isFavorite(data.id) ? "Quitar" : "Agregar"}
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  );
};
