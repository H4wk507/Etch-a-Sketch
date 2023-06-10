import React, { useState } from "react";
import { canvasSize } from "./constants";
import "./App.css";

interface Square {
  id: number;
  color: string;
  size: number;
}

// TODO: add types
type Mode = "color" | "rainbow" | "eraser";

export default function App() {
  // redundant cause of mode usestate?
  const [options, setOptions] = useState({
    rainbowMode: false,
    eraser: false,
    color: "#008080",
  });
  const [numberOfSideSquares, setNumberOfSideSquares] = useState(16);
  const [canvas, setCanvas] = useState<Square[]>(
    getCanvas(numberOfSideSquares),
  );
  const [mode, setMode] = useState<Mode>("color");

  return (
    <>
      <div className="header">
        <h1>Etch a Sketch</h1>
      </div>

      <hr />

      <div className="center">
        <div className="options">
          <ColorPicker options={options} setOptions={setOptions} />
          <ColorModeButton
            options={options}
            setOptions={setOptions}
            mode={mode}
            setMode={setMode}
          />
          <RainbowModeButton
            options={options}
            setOptions={setOptions}
            mode={mode}
            setMode={setMode}
          />
          <EraserButton
            options={options}
            setOptions={setOptions}
            mode={mode}
            setMode={setMode}
          />
          <ClearButton
            canvas={canvas}
            setCanvas={setCanvas}
            numberOfSideSquares={numberOfSideSquares}
          />
          <div className="canvas-size">
            {numberOfSideSquares} x {numberOfSideSquares}
          </div>
          <Slider
            numberOfSideSquares={numberOfSideSquares}
            setNumberOfSideSquares={setNumberOfSideSquares}
            setCanvas={setCanvas}
          />
        </div>

        <Canvas canvas={canvas} setCanvas={setCanvas} options={options} />
      </div>

      <hr />

      <div className="footer">
        <a href="https://github.com/H4wk507/Etch-a-Sketch" target="_blank">
          GitHub
        </a>
      </div>
    </>
  );
}

function Slider({ numberOfSideSquares, setNumberOfSideSquares, setCanvas }) {
  const handleChange = (e) => {
    // change canvas dimensions
    setNumberOfSideSquares(e.target.value);
    // and create a new canvas
    setCanvas(getCanvas(e.target.value));
  };
  return (
    <input
      onChange={handleChange}
      onInput={handleChange}
      className="slider"
      type="range"
      value={numberOfSideSquares}
      min="1"
      max="64"
    />
  );
}

function ColorModeButton({ options, setOptions, mode, setMode }) {
  const handleClick = () => {
    setOptions({
      ...options,
      eraser: false,
      rainbowMode: false,
    });
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

function RainbowModeButton({ options, setOptions, mode, setMode }) {
  const handleClick = () => {
    setOptions({
      ...options,
      eraser: false,
      rainbowMode: true,
    });
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

function EraserButton({ options, setOptions, mode, setMode }) {
  const handleClick = () => {
    setOptions({
      ...options,
      eraser: true,
      rainbowMode: false,
    });
    setMode("eraser");
  };

  return (
    <button
      onClick={handleClick}
      className={`eraser ${mode === "eraser" && "active"}`}
    >
      Eraser
    </button>
  );
}

function ClearButton({ canvas, setCanvas, numberOfSideSquares }) {
  const handleClick = () => {
    setCanvas(getCanvas(numberOfSideSquares));
  };

  return (
    <button onClick={handleClick} className="clear">
      Clear
    </button>
  );
}

function ColorPicker({ options, setOptions }) {
  const handleChange = (e: any) => {
    setOptions({
      ...options,
      color: e.target.value,
    });
  };

  return (
    <input
      onChange={handleChange}
      type="color"
      value={options.color}
      className="color-picker"
    />
  );
}

function getCanvas(numberOfSideSquares): Square[] {
  const squareSize = canvasSize / numberOfSideSquares;
  return new Array(numberOfSideSquares * numberOfSideSquares)
    .fill(0)
    .map((_, i) => ({ id: i, color: "white", size: squareSize }));
}

function getRandomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}

function Canvas({ canvas, setCanvas, options }) {
  const [lastColoredSquare, setLastColoredSquare] = useState(null);

  const draw = (event) => {
    if (event.buttons === 1) {
      // fixed generating a new rainbow color within the same square
      const { rainbowMode, eraser, color } = options;
      if (rainbowMode && lastColoredSquare !== event.target) {
        setCanvas(
          canvas.map((square) =>
            Number(event.target.id) === square.id
              ? { ...square, color: getRandomColor() }
              : square,
          ),
        );
      } else if (eraser) {
        setCanvas(
          canvas.map((square) =>
            Number(event.target.id) === square.id
              ? { ...square, color: "white" }
              : square,
          ),
        );
      } else if (!rainbowMode) {
        setCanvas(
          canvas.map((square) => {
            return Number(event.target.id) === square.id
              ? { ...square, color }
              : square;
          }),
        );
      }
      setLastColoredSquare(event.target);
    }
  };

  return (
    <div onMouseMove={draw} onMouseDown={draw} className="canvas">
      {canvas.map((square, i) => (
        <div
          id={i}
          key={i}
          className="square"
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
