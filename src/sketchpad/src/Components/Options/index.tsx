import { useState } from "react";
import { Mode, Square } from "../../helpers/types";
import CanvasSize from "../CanvasSize";
import ClearButton from "../ClearButton";
import ColorModeButton from "../ColorModeButton";
import ColorPicker from "../ColorPicker";
import EraserButton from "../EraserButton";
import RainbowModeButton from "../RainbowModeButton";
import Slider from "../Slider";
import { initialCanvasSideSize } from "../../helpers/constants";
import styles from "./style.module.scss";

interface OptionsProps {
  color: string;
  setColor: (color: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  setCanvas: (canvas: Square[]) => void;
}

export default function Options({
  color,
  setColor,
  mode,
  setMode,
  setCanvas,
}: OptionsProps) {
  const [numberOfSideSquares, setNumberOfSideSquares] = useState(
    initialCanvasSideSize,
  );

  return (
    <div className={styles.options}>
      <ColorPicker color={color} setColor={setColor} />
      <ColorModeButton mode={mode} setMode={setMode} />
      <RainbowModeButton mode={mode} setMode={setMode} />
      <EraserButton mode={mode} setMode={setMode} />
      <ClearButton
        setCanvas={setCanvas}
        numberOfSideSquares={numberOfSideSquares}
      />
      <CanvasSize numberOfSideSquares={numberOfSideSquares} />
      <Slider
        numberOfSideSquares={numberOfSideSquares}
        setNumberOfSideSquares={setNumberOfSideSquares}
        setCanvas={setCanvas}
      />
    </div>
  );
}
