interface CanvasSizeProps {
  numberOfSideSquares: number;
}

export default function CanvasSize({ numberOfSideSquares }: CanvasSizeProps) {
  return (
    <div className="canvas-size">
      {numberOfSideSquares} x {numberOfSideSquares}
    </div>
  );
}
