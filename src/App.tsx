import { useEffect, useState } from "react";
import "./App.css";
import cheerio from "cheerio";
import God from "./services/Gods";
import GodRow from "./components/GodRow";
import GodSearch from "./components/GodSearch";
import getGodsList from "./services/getGodsList";
import { getRandomIndex, getRandomIndexDay } from "./services/getRandomGod";
import getAchievment from "./services/getAchievment";

function App() {
  const url = "https://smite.fandom.com/wiki/List_of_gods";
  //"https://smite.fandom.com/api.php?action=query&prop=revisions&titles=List_of_gods&rvslots=*&rvprop=content&format=json&formatversion=2";

  const [godIndex, setGodIndex] = useState(0);
  const [gods, setGods] = useState<Array<God>>([]);
  const [guesses, setGuesses] = useState<Array<God>>([]);
  const [complete, setComplete] = useState<boolean>(false);

  const getGods = () => {
    fetch("https://corsproxy.io/?" + encodeURIComponent(url))
      .then((res) => res.text())
      .then((res) => {
        const godList = getGodsList(res);
        setGods(godList);
        setGodIndex(getRandomIndex(godList));
      });
  };

  const guess = (god: God) => {
    setGuesses([god, ...guesses]);
    setComplete(god.name === gods[godIndex].name);
  };

  useEffect(() => getGods(), []);

  if (gods.length < 1) {
    return;
  }
  return (
    <>
      <div className="container">
        <div className="achievmentContainer">
          <img
            className="achievment-image"
            src={`/images/achievments/${getAchievment(guesses.length)}.png`}
          />
          <p className="achievment-text">{getAchievment(guesses.length)}</p>
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
    </>
  );
}

export default App;
