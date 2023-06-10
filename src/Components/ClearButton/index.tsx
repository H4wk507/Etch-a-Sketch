import { Square } from "../../helpers/types";
import { getCanvas } from "../../helpers/utils";

interface ClearButtonProps {
  setCanvas: (canvas: Square[]) => void;
  numberOfSideSquares: number;
}

export default function ClearButton({
  setCanvas,
  numberOfSideSquares,
}: ClearButtonProps) {
  const handleClick = () => {
    setCanvas(getCanvas(numberOfSideSquares));
  };

  return (
    <button onClick={handleClick} className="clear">
      Clear
    </button>
  );
}
