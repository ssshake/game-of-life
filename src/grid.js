export default class Grid {
    constructor(fieldSize, numberOfCellsInRow){
        this.fieldSize = fieldSize;
        this.numberOfCellsInRow = numberOfCellsInRow;
        this._geometry = [];
    }

    makeRandomGrid() {
        const grid = new Array(this.numberOfCellsInRow)

        
        for (let i = 0; i < grid.length; i++) {
        
        
            grid[i] = new Array(this.numberOfCellsInRow)
        
        
            for (let j = 0; j < grid.length; j++) {
        
        
                grid[i][j] = Math.floor(Math.random() * 2)
        
        
            }
        
        
        }
        
        this._geometry = grid;
        
    }

    get geometry() {
        return this._geometry;
    }
      
}