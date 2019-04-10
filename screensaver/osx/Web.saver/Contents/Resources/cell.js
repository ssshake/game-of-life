const neighboursMatrix = [
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
];

//value.Clamp(0,1).toInt().
const normalizeValue = v => (v > 0 ? 1 : 0);

export default class Cell {
    constructor(grid, column, row, value = 0) {
        this.hsl = [194, '100%', '70%']
    
        this.meta = {
          continuity: 0,
        };
        this._value = normalizeValue(value);
        this._position = {
          row,
          column
        };
    
        const wrap = (size, v) => v < 0 ?
          v + size :
          (v >= size ?
            v - size :
            v);
    
        this._neighbours = neighboursMatrix.reduce((neighbours, matrixRow, r) => {
          return matrixRow.reduce((nextNeighbours, cell, c) => {
            if (r === 1 && c === 1) return nextNeighbours;
    
            return nextNeighbours.concat({
              column: wrap(grid.width, column + (c - 1)),
              row: wrap(grid.height, row + (r - 1)),
            });
          }, neighbours);
        }, []);
    }

    color () {
        return `hsl(${this.hsl.join(', ')})`;
    }

    isAlive() {
        return this._value === 1;
    }

    getNeighbours(grid){
        return this._neighbours.map((position) => {
            return grid.getCell(position.column, position.row);
        });
    }

    get neighbours (){
        return this._neighbours;
    }

    get value() {
        return this._value;
    }

    set value(value){
        this._value = normalizeValue(value);
    }
}
