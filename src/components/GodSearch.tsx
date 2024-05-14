import { useState } from "react";
import God from "../services/Gods";
import GodGuess from "./GodGuess";
import "./GodSearch.css";
interface Props {
  gods: Array<God>;
  guess: (god: God) => void;
  complete: boolean;
}
function GodSearch({ gods, guess, complete }: Props) {
  const [filteredGods, setFilteredGods] = useState<Array<God>>(gods);

  const filter = (e: React.FormEvent<HTMLInputElement>) => {
    setFilteredGods(
      gods.filter((god) => {
        return god.name
          .toLowerCase()
          .includes(e.currentTarget.value.toLowerCase());
      })
    );
  };

  return (
    <>
      <div className="god-search">
        <input type="text" className="search-bar" onChange={filter} />
        <div id="options" className="options">
          {filteredGods.map((god: God, idx: number) => (
            <GodGuess god={god} guess={guess} complete={complete} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
export default GodSearch;
