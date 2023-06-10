import { Mode } from "../../helpers/types";

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
      className={`color-mode ${mode === "color" && "active"}`}
    >
      Color mode
    </button>
  );
}
