const fieldSize = 800
const numberOfCellsInRow = 50
const framesPerSecond = 10
const cellStrokeColor = '#000'
const cellFillColor = 'rgba(0, 153, 255, 1)';
const clearColor = 'rgba(0, 0, 0, 1)';
const cellSize = fieldSize / numberOfCellsInRow

// import Game from './game.js';
import Grid from './grid.js';

const eraseCanvas = (ctx) => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, fieldSize, fieldSize);
};


const drawGrid = (ctx, grid) => {
  eraseCanvas(ctx);

  ctx.strokeStyle = cellStrokeColor
  ctx.fillStyle = cellFillColor;

  grid.eachCell((cell, {
    row,
    column
  }) => {
    if (cell.isAlive()) {
      ctx.fillRect(
        column * cellSize,
        row * cellSize,
        cellSize,
        cellSize,
      )
    }

    ctx.strokeRect(
      column * cellSize,
      row * cellSize,
      cellSize,
      cellSize,
    )
  });
}

const generation = (ctx, grid) => {
  grid.update();
  drawGrid(ctx, grid);
}

// const makeMouseHandler = ctx => (e) => {
//   ctx.fillStyle = "#FF00FF";
//   let size = (fieldSize / numberOfCellsInRow)
//   ctx.fillRect(Math.floor(e.offsetX / size) * size,
//     Math.floor(e.offsetY / size) * size,
//     size, size);
// };


const init = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  // const mouseHandler = makeMouseHandler(ctx);
  // canvas.addEventListener('click', mouseHandler);
  // canvas.addEventListener('mousemove', mouseHandler);

  let interval = null;
  const toggle = document.querySelector('#toggle');
  const step = document.querySelector('#step');
  const reset = document.querySelector('#reset');
  const seedPercent = 1 / 2;

  const pause = () => {
    if (!interval) return;

    toggle.innerText = 'Play';
    clearInterval(interval);
    interval = null;
  };

  const play = () => {
    if (interval) return;

    toggle.innerText = 'Pause';
    interval = setInterval(() => {
      generation(ctx, grid)
    }, 1000 / framesPerSecond);
  };

  toggle.addEventListener('click', () => {
    if (interval) {
      pause();
    } else {
      play();
    }
  });

  step.addEventListener('click', () => {
    pause();
    generation(ctx, grid);
  });

  reset.addEventListener('click', () => {
    pause();
    grid.emptyGrid();
    grid.seed(seedPercent);
    drawGrid(ctx, grid);
  });


  const grid = new Grid(numberOfCellsInRow)
  grid.seed(seedPercent);

  drawGrid(ctx, grid);
}

init();
