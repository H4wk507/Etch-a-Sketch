import styles from "./style.module.scss";

interface CanvasSizeProps {
  numberOfSideSquares: number;
}

export default function CanvasSize({ numberOfSideSquares }: CanvasSizeProps) {
  return (
    <div className={styles["canvas-size"]}>
      {numberOfSideSquares} x {numberOfSideSquares}
    </div>
  );
}
