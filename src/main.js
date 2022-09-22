(function () {
  const canvasSize = 500;

  // default size
  let numberOfSquares = 16;
  let squareSize = canvasSize / numberOfSquares;
  // default color
  let drawingColor = "#008080";
  let drawRainbow = false;
  let erase = false;
  let lastColoredSquare = null;

  let canvas = document.querySelector(".canvas");
  const center = document.querySelector(".center");
  const colorPicker = document.querySelector(".color-picker");
  const colorMode = document.querySelector(".color-mode");
  const rainbowMode = document.querySelector(".rainbow-mode");
  const eraser = document.querySelector(".eraser");
  const clear = document.querySelector(".clear");
  const canvasSizeText = document.querySelector(".canvas-size");
  const slider = document.querySelector(".slider");

  clearCanvas();

  colorPicker.addEventListener("change", (event) => {
    drawingColor = event.target.value;
  });

  colorMode.addEventListener("click", () => {
    erase = false;
    drawRainbow = false;
    drawingColor = colorPicker.value;

    changeButtonTo(colorMode);
  });

  rainbowMode.addEventListener("click", () => {
    erase = false;
    drawRainbow = true;

    changeButtonTo(rainbowMode);
  });

  eraser.addEventListener("click", () => {
    erase = true;
    drawRainbow = false;

    changeButtonTo(eraser);
  });

  clear.addEventListener("click", () => {
    clear.classList.add("active");
    setTimeout(() => clear.classList.remove("active"), 300);

    clearCanvas();
  });

  addMultipleListeners(slider, ["input", "change"], changeCanvasDimensionsText);

  slider.addEventListener("mouseup", () => {
    calculateCanvasDimensions();
    clearCanvas();
  });

  function calculateCanvasDimensions() {
    /* Calculate the new square dimensions. */
    numberOfSquares = parseInt(canvasSizeText.innerText);
    squareSize = canvasSize / numberOfSquares;
  }

  function createNewCanvas() {
    if (canvas !== null) {
      canvas.remove();
    }
    canvas = document.createElement("div");
    canvas.classList.add("canvas");
    center.appendChild(canvas);
  }

  function drawSquare() {
    /* Draw square on the canvas. */
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("draggable", false);
    square.style.width = squareSize.toString() + "px";
    square.style.height = squareSize.toString() + "px";
    canvas.appendChild(square);
  }

  function clearCanvas() {
    createNewCanvas();

    /* Generate new blank squares on canvas */
    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
      drawSquare();
    }

    /* Add coloring on mousemove and mousedown on the new canvas */
    addMultipleListeners(canvas, ["mousemove", "mousedown"], draw);
  }

  function draw(event) {
    /* Draw color on the canvas */
    if (event.buttons === 1) {
      // fixed generating a new rainbow color within the same square
      if (drawRainbow && lastColoredSquare !== event.target) {
        event.target.style.backgroundColor = getRandomColor();
      } else if (erase) {
        event.target.style.backgroundColor = "white";
      } else if (!drawRainbow) {
        event.target.style.backgroundColor = drawingColor;
      }
      lastColoredSquare = event.target;
    }
  }

  function changeCanvasDimensionsText(event) {
    /* Change the canvas dimensions text above the slider. */
    const size = event.target.value;
    document.querySelector(".canvas-size").innerText =
      size.toString() + " x " + size.toString();
  }

  function changeButtonTo(button) {
    document.querySelector(".active").classList.remove("active");
    button.classList.add("active");
  }

  function addMultipleListeners(element, events, handler) {
    /* Add multiple listening 'events' to the 'element' with function 'handler'. */
    events.forEach((e) =>
      element.addEventListener(e, (event) => handler(event)),
    );
  }

  function getRandomColor() {
    return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  }
})();
