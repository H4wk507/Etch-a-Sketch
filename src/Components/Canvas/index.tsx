import { MouseEvent, useState } from "react";
import { getRandomColor } from "../../helpers/utils";
import { Mode, Square } from "../../helpers/types";
import styles from "./style.module.scss";

interface CanvasProps {
  canvas: Square[];
  setCanvas: (canvas: Square[]) => void;
  mode: Mode;
  color: string;
}

export default function Canvas({
  canvas,
  setCanvas,
  mode,
  color,
}: CanvasProps) {
  const [lastColoredSquareId, setLastColoredSquareId] = useState<number | null>(
    null,
  );

  const draw = (e: MouseEvent<HTMLDivElement>) => {
    const divId = Number((e.target as HTMLDivElement).id);
    if (e.buttons === 1) {
      // fixed generating a new rainbow color within the same square
      if (mode === "rainbow" && lastColoredSquareId !== divId) {
        setCanvas(
          canvas.map((square) =>
            divId === square.id
              ? { ...square, color: getRandomColor() }
              : square,
          ),
        );
      } else if (mode === "eraser") {
        setCanvas(
          canvas.map((square) =>
            divId === square.id ? { ...square, color: "white" } : square,
          ),
        );
      } else if (mode !== "rainbow") {
        setCanvas(
          canvas.map((square) =>
            divId === square.id ? { ...square, color } : square,
          ),
        );
      }
      setLastColoredSquareId(divId);
    }
  };

  return (
    <div onMouseMove={draw} onMouseDown={draw} className={styles.canvas}>
      {canvas.map((square, i) => (
        <div
          id={i.toString()}
          key={i}
          className={styles.square}
          style={{
            backgroundColor: square.color,
            width: square.size.toString() + "px",
            height: square.size.toString() + "px",
          }}
        ></div>
      ))}
    </div>
  );
}
