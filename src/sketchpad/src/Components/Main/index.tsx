import { useState } from "react";
import { initialCanvasSideSize } from "../../helpers/constants";
import { Mode, Square } from "../../helpers/types";
import { getCanvas } from "../../helpers/utils";
import Options from "../Options";
import Canvas from "../Canvas";

export default function Main() {
  const [canvas, setCanvas] = useState<Square[]>(
    getCanvas(initialCanvasSideSize),
  );
  const [mode, setMode] = useState<Mode>("color");
  const [color, setColor] = useState<string>("#008080");

  return (
    <div className="center">
      <Options
        color={color}
        setColor={setColor}
        mode={mode}
        setMode={setMode}
        setCanvas={setCanvas}
      />
      <Canvas canvas={canvas} setCanvas={setCanvas} mode={mode} color={color} />
    </div>
  );
}
