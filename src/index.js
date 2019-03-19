const framesPerSecond = 30
const cellStrokeColor = '#000'
const cellFillColor = '';
const clearColor = '';

const timers = {
  raf: {
    trigger: fn => requestAnimationFrame(fn),
    clear: handle => cancelAnimationFrame(handle),
  },
  timeout: {
    trigger: fn => setTimeout(fn, 1000 / framesPerSecond),
    clear: handle => clearTimeout(handle),
  },
};

const themes = {
  default: {
    clear: 'rgba(0, 0, 0, .1)',
    cellStroke: '#000',
    cellFill: 'rgba(0, 153, 255, 1)',
  },
  inverted: {
    clear: 'rgba(255, 255, 255, 0.3)',
    cellStroke: '#FFF',
    cellFill: 'rgba(0, 0, 0, 1)',
  },
};

const colors = themes.default;

import Game from './game.js';
import Grid from './grid.js';


const makeMouseHandler = game => ({
  offsetX,
  offsetY
}) => {
  game.ctx.fillStyle = "#FF00FF";
  game.ctx.fillRect(
    Math.floor(offsetX / game.cellSize[0]) * game.cellSize[0],
    Math.floor(offsetY / game.cellSize[1]) * game.cellSize[1],
    game.cellSize[0],
    game.cellSize[1]
  );
};


const init = () => {
  const canvasSize = [window.innerWidth, window.innerHeight];
  const cellCount = [250, 150];

  const canvas = document.getElementById('canvas');
  canvas.width = canvasSize[0];
  canvas.height = canvasSize[1];

  const ctx = canvas.getContext('2d');

  const seedPercent = 1 / 2;

  const game = new Game(ctx, themes.default, timers.raf)

  const mouseHandler = makeMouseHandler(game);
  canvas.addEventListener('click', mouseHandler);
  canvas.addEventListener('mousemove', mouseHandler);

  const grid = new Grid(cellCount[0], cellCount[1])
  grid.seed(seedPercent);

  game.start(grid)
}

init();
