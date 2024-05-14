import God from "../services/Gods";
import "./GodRow.css";
import { MouseEvent, useState } from "react";

interface Props {
  god: God;
  correctGod: God;
}
function GodRow({ god, correctGod }: Props) {
  const [overProp, setOverProp] = useState("");
  const showIndicator = (e: MouseEvent<HTMLDivElement>, property: string) => {
    setOverProp(property);
    const image = e.currentTarget.children[0].children[0] as HTMLImageElement;
    const prop = property as keyof God;
    image.src = `/images/indicators/${god[prop]}.png`;
  };
  const showCorrect = (e: MouseEvent<HTMLDivElement>, property: string) => {
    setOverProp("");
    const image = e.currentTarget.children[0].children[0] as HTMLImageElement;
    const prop = property as keyof God;
    image.src = `/images/indicators/${
      god[prop] == correctGod[prop] ? "Correct" : "Incorrect"
    }.png`;
  };
  return (
    <>
      <div className="guess-row">
        <div className="guess-box">
          <img
            className="guess-image"
            src={`/images/gods/${god.name}.png`}
          ></img>
        </div>

        <div
          className={"guess-box"}
          onMouseOver={(e) => {
            showIndicator(e, "pantheon");
          }}
          onMouseOut={(e) => {
            showCorrect(e, "pantheon");
          }}
        >
          <p className="guess-text">
            {overProp !== "pantheon" && god.pantheon}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.pantheon === correctGod.pantheon ? "Correct" : "Incorrect"
              }.png`}
            ></img>
          </p>
        </div>

        <div
          className={"guess-box"}
          onMouseOver={(e) => {
            showIndicator(e, "class");
          }}
          onMouseOut={(e) => {
            showCorrect(e, "class");
          }}
        >
          <p className="guess-text">
            {overProp !== "class" && god.class}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.class === correctGod.class ? "Correct" : "Incorrect"
              }.png`}
            ></img>
          </p>
        </div>

        <div
          className={"guess-box"}
          onMouseOver={(e) => {
            showIndicator(e, "attackType");
          }}
          onMouseOut={(e) => {
            showCorrect(e, "attackType");
          }}
        >
          <p className="guess-text">
            {overProp !== "attackType" && god.attackType}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.attackType === correctGod.attackType
                  ? "Correct"
                  : "Incorrect"
              }.png`}
            ></img>
          </p>
        </div>

        <div
          className={"guess-box"}
          onMouseOver={(e) => {
            showIndicator(e, "powerType");
          }}
          onMouseOut={(e) => {
            showCorrect(e, "powerType");
          }}
        >
          <p className="guess-text">
            {overProp !== "powerType" && god.powerType}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.powerType === correctGod.powerType ? "Correct" : "Incorrect"
              }.png`}
            ></img>
          </p>
        </div>

        <div className={"guess-box"}>
          <p className="guess-text">
            {god.releaseYear}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.releaseYear == correctGod.releaseYear
                  ? "Correct"
                  : god.releaseYear < correctGod.releaseYear
                  ? "Higher"
                  : "Lower"
              }.png`}
            ></img>
          </p>
        </div>
      </div>
    </>
  );
  /*<div className="guess-row">
        <div className="guess-box">
          <img
            className="guess-image"
            src={`/images/gods/${god.name}.png`}
          ></img>
        </div>
        <div
          className={`guess-box ${
            god.pantheon === correctGod.pantheon
              ? "guess-correct"
              : "guess-incorrect"
          }`}
        >
          <p className="guess-text">{god.pantheon}</p>
        </div>
        <div
          className={`guess-box ${
            god.class === correctGod.class ? "guess-correct" : "guess-incorrect"
          }`}
        >
          <p className="guess-text">{god.class}</p>
        </div>
        <div
          className={`guess-box ${
            god.attackType === correctGod.attackType
              ? "guess-correct"
              : "guess-incorrect"
          }`}
        >
          <p className="guess-text">{god.attackType}</p>
        </div>
        <div
          className={`guess-box ${
            god.powerType === correctGod.powerType
              ? "guess-correct"
              : "guess-incorrect"
          }`}
        >
          <p className="guess-text">{god.powerType}</p>
        </div>
        <div className={"guess-box"}>
          <p className="guess-text">
            {god.releaseYear}
            <img
              className="guess-image"
              src={`/images/indicators/${
                god.releaseYear == correctGod.releaseYear
                  ? "Correct"
                  : god.releaseYear > correctGod.releaseYear
                  ? "Higher"
                  : "Lower"
              }.png`}
            ></img>
          </p>
        </div>
      </div>*/
}
export default GodRow;
