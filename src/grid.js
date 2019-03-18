const makeArrayOfSize = (size) => {
  return 'x'.repeat(size).split('').map(() => null);
}

import Cell from './cell';

export default class Grid {
  constructor(numberOfCellsInRow) {
    this.size = numberOfCellsInRow;
    this.emptyGrid();
  }

  emptyGrid() {
    this.cells = makeArrayOfSize(this.size)
      .map((_, row) =>
        makeArrayOfSize(this.size).map((_, column) =>
          new Cell(this, column, row, 0)
        )
      );
  }

  seed(rareness = 1 / 2) {
    this.eachCell((cell) => {
      cell.value = Math.random() > (1.0 - rareness) ? 1 : 0;
    });
  }

  eachCell(callback) {
    this.cells.forEach((rowCells, row) => {
      rowCells.forEach((cell, column) => {
        callback(cell, {
          row,
          column
        });
      });
    });
  }

  getCell(column, row) {
    return this.cells[row] && this.cells[row][column]
  }

  update() {
    let commits = [];

    this.eachCell((cell, {
      row,
      column
    }) => {
      const neighbours = cell
        .getNeighbours(this)
        .reduce((sum, neighbourCell) => sum + neighbourCell.value, 0);

      // cell.meta = {
      //   ...cell.meta,
      //   neighbours,
      // };

      if (cell.value === 0 && neighbours === 3) { //If cell is dead but has three living neighours
        //Bring to life

        commits.push([cell, 1]);
        // cell.value = 1
        // cell.meta.continuity = 0;

      } else if ((cell.value === 1) && (neighbours != 2 && neighbours != 3)) { //If alive not 2-3 neighbours, die

        // cell.value = 0
        commits.push([cell, 0]);
        // cell.meta.continuity = 0;

      } else { //else sustain

        // cell.value = cell.value
        // cell.meta.continuity += 1;

      }
    });

    commits.forEach(([cell, value]) => cell.value = value);
  }

}
