import { canvasSize } from "./constants";
import { Square } from "./types";

export function getCanvas(numberOfSideSquares: number): Square[] {
  const squareSize = canvasSize / numberOfSideSquares;
  return new Array(numberOfSideSquares * numberOfSideSquares)
    .fill(0)
    .map((_, i) => ({ id: i, color: "white", size: squareSize }));
}

export function getRandomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}
