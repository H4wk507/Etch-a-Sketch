import { Mode } from "../../helpers/types";
import styles from "../Options/style.module.scss";

interface RainbowModeButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function RainbowModeButton({
  mode,
  setMode,
}: RainbowModeButtonProps) {
  const handleClick = () => {
    setMode("rainbow");
  };

  return (
    <button
      onClick={handleClick}
      className={`${mode === "rainbow" && styles.active}`}
    >
      Rainbow mode
    </button>
  );
}
