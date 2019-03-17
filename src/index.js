const fieldSize = 800
const numberOfCellsInRow = 50
const framesPerSecond = 10
const cellStrokeColor = '#000'
const cellFillColor = 'rgba(0, 153, 255, 1)';
const clearColor = 'rgba(0, 0, 0, .2)';

// import Game from './game.js';
import Grid from './grid.js';
import Cell from './cell.js';

const getNextGeneration = (grid) => {

  const nextGrid = new Array(grid.length)

  for (let i = 0; i < grid.length; i++) {

    nextGrid[i] = new Array(grid.length)

    for (let j = 0; j < nextGrid[i].length; j++) {

      const value = grid[i][j]

      const neighbors = countNeighbors(grid, i, j)

      if (value === 0 && neighbors === 3) { //If cell is dead but has three living neighours
                                            //Bring to life

        nextGrid[i][j] = 1

      } else if ( (value === 1) && (neighbors != 2 && neighbors != 3) ) { //If alive not 2-3 neighbours, die

        nextGrid[i][j] = 0

      } else {          //else sustain

        nextGrid[i][j] = value

      }
    }
  }
  return nextGrid
}

const countNeighbors = (grid, x, y) => {

  let sum = 0

  const numberOfRows = grid.length
  const numberOfCols = grid[0].length

  for (let i = -1; i < 2; i++) {

    for (let j = -1; j < 2; j++) {

      const row = (x + i + numberOfRows) % numberOfRows
      const col = (y + j + numberOfCols) % numberOfCols
      sum += grid[row][col]

    }
  }

  sum -= grid[x][y]
  return sum

}


const drawGrid = (ctx, grid) => {
  const cellSize = fieldSize / numberOfCellsInRow
  ctx.strokeStyle = cellStrokeColor
  ctx.fillStyle = cellFillColor;

  for (let i = 0; i < grid.length; i++) {

    for (let j = 0; j < grid.length; j++) {

      const value = grid[i][j]

      if (value) {
        ctx.fillRect(
          i * cellSize,
          j * cellSize,
          cellSize,
          cellSize,
        )
      }

      ctx.strokeRect(
        i * cellSize,
        j * cellSize,
        cellSize,
        cellSize,
      )

    }
  }
}

const generation = (ctx, grid) => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, fieldSize, fieldSize);
//   ctx.clearRect(0, 0, fieldSize, fieldSize)
  drawGrid(ctx, grid)
  const gridOfNextGeneration = getNextGeneration(grid)
  setTimeout(() => {
    requestAnimationFrame(() => generation(ctx, gridOfNextGeneration))
  }, 1000 / framesPerSecond)
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')


  const grid = new Grid(fieldSize, numberOfCellsInRow)
  grid.makeRandomGrid();
  console.log(grid.geometry)

  generation(ctx, grid.geometry)
  
}