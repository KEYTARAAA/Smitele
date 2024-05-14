import God from "../services/Gods";
import "./GodGuess.css";

interface Props {
  god: God;
  guess: (god: God) => void;
  complete: boolean;
}
function GodGuess({ god, guess, complete }: Props) {
  return (
    <>
      <div
        className="option-row"
        onClick={() => {
          if (!complete) {
            guess(god);
          }
        }}
      >
        <img
          className="option-image"
          src={`/images/gods/${god.name}.png`}
        ></img>
        <p className="option-text">{god.name}</p>
      </div>
    </>
  );
}
export default GodGuess;
