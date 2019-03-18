const neighboursMatrix = [
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
];

const normalizeValue = v => (v > 0 ? 1 : 0);

export default class Cell {
  constructor(grid, column, row, value = 0) {
    this._value = normalizeValue(value);

    this._neighbours = neighboursMatrix.reduce((neighbours, matrixRow, r) => {
      return matrixRow.reduce((nextNeighbours, cell, c) => {
        if (r === 0 && c === 0) return nextNeighbours;

        return nextNeighbours.concat({
          column: (column + c) % grid.size,
          row: (row + r) % grid.size,
        });
      }, neighbours);
    }, []);
  }

  getNeighbours(grid) {
    return this._neighbours.map(position => grid.getCell(position.column, position.row));
  }

  get neighbours() {
    return this._neighbours;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = normalizeValue(value);
  }
}
