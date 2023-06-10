import { Mode } from "../../helpers/types";
import styles from "../Options/style.module.scss";

interface EraserButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function EraserButton({ mode, setMode }: EraserButtonProps) {
  const handleClick = () => {
    setMode("eraser");
  };

  return (
    <button
      onClick={handleClick}
      className={`${mode === "eraser" && styles.active}`}
    >
      Eraser
    </button>
  );
}
