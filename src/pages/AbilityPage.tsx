import { useEffect, useState } from "react";
import "../styles/AbilityPage.css";
import getAbilityList from "../services/getGodAbilityList";
import God from "../services/Gods";
import { getRandomAbilityIndexDay } from "../services/getRandomAbility";
import Ability from "../services/Ability";
import { getRandomGodIndexDay } from "../services/getRandomGod";
import GodSearch from "../components/GodSearch";
import getAchievment from "../services/getAchievment";
import Confetti from "../components/Confetti";

interface Props {
  gods: Array<God>;
}
function AbilityPage({ gods }: Props) {
  const [godIndex, setGodIndex] = useState(0);
  const [ability, setAbility] = useState<Ability>();
  const [guesses, setGuesses] = useState<Array<God>>([]);
  const [complete, setComplete] = useState<boolean>(false);

  const guess = (god: God) => {
    setGuesses([god, ...guesses]);
    setComplete(god.name === gods[godIndex].name);
  };

  useEffect(() => {
    const index = getRandomGodIndexDay(gods, 2);
    setGodIndex(index);
    getAbilityList(
      `https://smite.fandom.com/wiki/${gods[index].name.split(" ").join("_")}`,
      gods[index]
    ).then((res) => {
      setAbility(res[getRandomAbilityIndexDay(res, 2)]);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="ability-container">
          <div className="ability-box">
            <img src={ability?.image || ""} className="ability-image" />
          </div>
          <div className="ability-details-container">
            {(complete ? guess.length - 1 : guesses.length) < 2 || (
              <h3>{ability?.abilityPosition}</h3>
            )}
            {(complete ? guess.length - 1 : guesses.length) < 4 || (
              <h3>{ability?.abilityType}</h3>
            )}
            {(complete ? guess.length - 1 : guesses.length) < 5 || (
              <h3>{ability?.name}</h3>
            )}
          </div>
        </div>
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
          <div className="ability-guess-container">
            {guesses.map((guess: God, index: number) => (
              <div className="ability-box" key={index}>
                <img
                  src={`/images/gods/${guess.name}.png`}
                  className="ability-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Confetti show={complete} />
    </>
  );
}
export default AbilityPage;
