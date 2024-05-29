import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
interface Props {
  show: boolean;
}
function Confetti({ show }: Props) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: document.documentElement.scrollWidth,
    heigth: document.documentElement.scrollHeight,
  });
  const detectSize = () => {
    setWindowDimensions({
      width: document.documentElement.scrollWidth,
      heigth: document.documentElement.scrollHeight,
    });
  };
  useEffect(() => {
    detectSize();

    window.addEventListener("resize", detectSize);
    const observer = new MutationObserver(detectSize);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      window.removeEventListener("resize", detectSize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {show && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.heigth}
        />
      )}
    </>
  );
}
export default Confetti;
