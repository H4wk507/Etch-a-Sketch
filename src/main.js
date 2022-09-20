const canvasWidth = 500;
const canvasHeight = 500;

let numberOfSquares = 16;
let squareSize = canvasWidth / numberOfSquares;
let color = "#333333"; // default color
let rainbowMode = false;
let currOption = document.querySelector(".color-mode");

let canvas = document.querySelector(".canvas");
const center = document.querySelector(".center");
const footer = document.querySelector(".footer");

const Color = Object.freeze({
  GRAY: "#333333",
  WHITE: "#ffffff",
  BLACK: "#000000",
});

function calculateSquares() {
  /* calculate new square dimensions */
  numberOfSquares = parseInt(document.querySelector(".canvas-size").innerText);
  squareSize = canvasWidth / numberOfSquares;
}

function createNewCanvas() {
  if (canvas !== null) {
    canvas.remove();
  }
  canvas = document.createElement("div");
  canvas.classList.add("canvas");
  center.appendChild(canvas);
}

function clearCanvas() {
  createNewCanvas();

  /* generate new blank squares on canvas */
  for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", false);
    square.classList.add("square");
    square.style.width = squareSize.toString() + "px";
    square.style.height = squareSize.toString() + "px";
    canvas.appendChild(square);
  }

  /* add coloring on mousemove and mousedown */
  // TODO: format?
  ["mousemove", "mousedown"].forEach(function (e) {
    canvas.addEventListener(e, (event) => {
      if (event.buttons === 1) {
        if (rainbowMode) {
          event.target.style.backgroundColor =
            "#" + (((1 << 24) * Math.random()) | 0).toString(16);
        } else {
          event.target.style.backgroundColor = color;
        }
      }
    });
  });
}

/* change text above the slider */
function changeCanvasDimensionsText(size) {
  document.querySelector(".canvas-size").innerText =
    size.toString() + " x " + size.toString();
}

function main() {
  currOption.style.backgroundColor = Color.GRAY;
  clearCanvas();

  document
    .querySelector(".color-picker")
    .addEventListener("change", (event) => {
      color = event.target.value;
    });

  document.querySelector(".color-mode").addEventListener("click", (event) => {
    rainbowMode = false;
    color = document.querySelector(".color-picker").value;

    currOption.style.backgroundColor = Color.BLACK;
    currOption = document.querySelector(".color-mode");
    currOption.style.backgroundColor = Color.GRAY;
  });

  document.querySelector(".rainbow-mode").addEventListener("click", () => {
    rainbowMode = true;

    currOption.style.backgroundColor = Color.BLACK;
    currOption = document.querySelector(".rainbow-mode");
    currOption.style.backgroundColor = Color.GRAY;
  });

  document.querySelector(".eraser").addEventListener("click", () => {
    color = Color.WHITE;

    // TODO: write a function for this
    currOption.style.backgroundColor = Color.BLACK;
    currOption = document.querySelector(".eraser");
    currOption.style.backgroundColor = Color.GRAY;
  });

  document.querySelector(".clear").addEventListener("click", clearCanvas);

  document.querySelector(".slider").addEventListener("mouseup", () => {
    calculateSquares();
    clearCanvas();
  });
}

main();
