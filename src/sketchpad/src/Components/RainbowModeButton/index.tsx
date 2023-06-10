import { Mode } from "../../helpers/types";

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
      className={`rainbow-mode ${mode === "rainbow" && "active"}`}
    >
      Rainbow mode
    </button>
  );
}
