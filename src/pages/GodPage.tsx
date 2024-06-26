import { useState, useEffect } from "react";
import GodRow from "../components/GodRow";
import GodSearch from "../components/GodSearch";
import God from "../services/Gods";
import getAchievment from "../services/getAchievment";
import { getRandomIndexDay } from "../services/getRandom";
import Confetti from "../components/Confetti";

interface Props {
  gods: Array<God>;
}
function GodPage({ gods }: Props) {
  const [godIndex, setGodIndex] = useState(0);
  const [guesses, setGuesses] = useState<Array<God>>([]);
  const [complete, setComplete] = useState<boolean>(false);

  const guess = (god: God) => {
    setGuesses([god, ...guesses]);
    setComplete(god.name === gods[godIndex].name);
  };

  useEffect(() => setGodIndex(getRandomIndexDay(gods, 1)), []);
  return (
    <>
      <div className="container">
        <div className="achievmentContainer">
          <img
            className="achievment-image"
            src={`/images/achievments/${getAchievment(
              complete ? guesses.length - 1 : guesses.length
            )}.png`}
          />
          <p className="achievment-text">
            {getAchievment(complete ? guesses.length - 1 : guesses.length)}
          </p>
        </div>
        <div className="game-container">
          <GodSearch gods={gods} guess={guess} complete={complete} />
          <div className="guesses">
            {guesses.map((god: God, idx: number) => (
              <GodRow god={god} correctGod={gods[godIndex]} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <Confetti show={complete} />
    </>
  );
}
export default GodPage;
