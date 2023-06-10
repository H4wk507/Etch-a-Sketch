import { Mode } from "../../helpers/types";
import styles from "../Options/style.module.scss";

interface ColorModeButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function ColorModeButton({
  mode,
  setMode,
}: ColorModeButtonProps) {
  const handleClick = () => {
    setMode("color");
  };

  return (
    <button
      onClick={handleClick}
      className={`${mode === "color" && styles.active}`}
    >
      Color mode
    </button>
  );
}
