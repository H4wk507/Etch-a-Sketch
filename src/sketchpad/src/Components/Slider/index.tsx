import { Square } from "../../helpers/types";
import { getCanvas } from "../../helpers/utils";
import { ChangeEvent } from "react";

interface SliderProps {
  numberOfSideSquares: number;
  setNumberOfSideSquares: (numberOfSideSquares: number) => void;
  setCanvas: (canvas: Square[]) => void;
}

export default function Slider({
  numberOfSideSquares,
  setNumberOfSideSquares,
  setCanvas,
}: SliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfSideSquares(Number(e.target.value));
    setCanvas(getCanvas(Number(e.target.value)));
  };

  return (
    <input
      onChange={handleChange}
      className="slider"
      type="range"
      value={numberOfSideSquares}
      min="1"
      max="64"
    />
  );
}
