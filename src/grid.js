export default class Grid {
    constructor(fieldSize, numberOfCellsInRow){
        this.fieldSize = fieldSize;
        this.numberOfCellsInRow = numberOfCellsInRow;
        this._geometry = [];
        this.cellSize = fieldSize / numberOfCellsInRow
    }

    makeRandomGrid() {
        const size = this.numberOfCellsInRow;
        const grid = this.makeArrayOfSize(size);

        for (let y = 0; y < grid.length; y++) {

            grid[y] = this.makeArrayOfSize(size);
            
                for (let x = 0; x < grid.length; x++) {
                
                    grid[y][x] = Math.floor(Math.random() * 2)
                
                }
        
        }
        
        this._geometry = grid;
    }

    get geometry() {
        return this._geometry;
    }

    makeArrayOfSize(size){
        return new Array(size)
    }

    reset() {
        this._geometry = [];
    }
      
}