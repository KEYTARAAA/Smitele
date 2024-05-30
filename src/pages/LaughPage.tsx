import { useEffect, useRef, useState } from "react";
import "../styles/LaughPage.css";
import God from "../services/Gods";
import Voiceline from "../services/Voiceline";
import { getRandomIndexDay } from "../services/getRandom";
import Confetti from "../components/Confetti";
import GodSearch from "../components/GodSearch";
import getAchievment from "../services/getAchievment";
import getLaughList from "../services/getLaughList";

interface Props {
  gods: Array<God>;
}
function LaughPage({ gods }: Props) {
  const [godIndex, setGodIndex] = useState(0);
  const [voiceline, setVoiceline] = useState<Voiceline>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [guesses, setGuesses] = useState<Array<God>>([]);
  const [complete, setComplete] = useState<boolean>(false);

  const guess = (god: God) => {
    setGuesses([god, ...guesses]);
    setComplete(god.name === gods[godIndex].name);
  };

  useEffect(() => {
    const index = getRandomIndexDay(gods, 5);
    setGodIndex(index);
    getLaughList(
      `https://smite.fandom.com/wiki/${gods[index].name
        .split(" ")
        .join("_")}_voicelines`,
      gods[index]
    ).then((res) => {
      setVoiceline(res[getRandomIndexDay(res, 5)]);
    });
  }, []);
  return (
    <>
      <audio ref={audioRef} src={voiceline?.voiceline} />
      <button
        className="laugh-audio-button"
        onClick={() => audioRef.current?.play()}
      />
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
export default LaughPage;
