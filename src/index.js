const framesPerSecond = 30;
const cellStrokeColor = '#000';
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
  }
}

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
}

const colors = themes.default;

import Game from './game.js';
import Grid from './grid.js';

const makeMouseHandler = game => ({
  offsetX,
  offsetY
}) => {
  game.setCursor([offsetX, offsetY]);
};

const init = () => {
  const canvasSize = [window.innerWidth, window.innerHeight];
  const cellCount = [250, 150];
  const canvas = document.getElementById('canvas');
  canvas.width = canvasSize[0];
  canvas.height = canvasSize[1];
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx, themes.default, timers.timeout);
  const mouseHandler = makeMouseHandler(game);
  canvas.addEventListener('click', mouseHandler );
  canvas.addEventListener('mousemove', mouseHandler );
  canvas.addEventListener('mouseout', () => {
    game.removeCursor();
  });

  const grid = new Grid(cellCount[0], cellCount[1]);
  grid.seed( 0.5 );
  game.start(grid);
};

init();