import God from "../services/Gods";
interface Props {
  god: God;
}
function GodCard({ god }: Props) {
  return (
    <>
      <p>{`${god.name} : ${god.pantheon} ${god.class}`}</p>
      <img src={`/images/${god.name}.png`}></img>
    </>
  );
}
export default GodCard;
