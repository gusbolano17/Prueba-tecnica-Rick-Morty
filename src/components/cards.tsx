import type { FC } from "react";
import type { Character } from "../model/characters";

interface CardsProps {
  ch?: Character[];
  charClicked: (id: number) => void;
}

export const Cards: FC<CardsProps> = ({ ch, charClicked }) => {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {ch?.map((ch: any) => {
        return (
          <div
            key={ch.id}
            className="border border-amber-300 rounded-lg p-2"
            onClick={() => charClicked(ch.id)}
          >
            <img
              src={ch.image}
              alt={ch.name}
              className="w-full rounded-md mb-2"
            />
            <h2 className="text-xl font-bold text-amber-300">{ch.name}</h2>
            <p className="text-gray-400">Status: {ch.status}</p>
            <p className="text-gray-400">Species: {ch.species}</p>
          </div>
        );
      })}
    </div>
  );
};
