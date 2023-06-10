import { Mode } from "../../helpers/types";

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
      className={`eraser ${mode === "eraser" && "active"}`}
    >
      Eraser
    </button>
  );
}
