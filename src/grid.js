const makeArrayOfSize = (size) => {
    return 'x'.repeat(size).split('').map(() => null);
}

import Cell from './cell';

export default class Grid {
    constructor(width, height){
        this.width = width;
        this.height = height || width;
        this.emptyGrid()
    }

    emptyGrid() {

        this.cells = makeArrayOfSize(this.height).map((_, row) => {
                return makeArrayOfSize(this.width).map((_, column) => {
                    return new Cell(this, column, row, 0)
                });
            });
    }

    seed( rareness =  1 / 2 ) {
        this.eachCell((cell) => {
            cell.value = Math.random() > ( 1.0 - rareness) ? 1 : 0;
        })
    }

    eachCell(callback){
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
        return this.cells[row] && this.cells[row][column];
    }


    update(){
        let commits = [];

        const dostuff = (cell, { row, column} ) => {
            const neighbours = cell.getNeighbours(this);

            const sum = ( arr, get) => {
                 return arr.reduce((sum, item) => {
                    return sum + get(item)
                }, 0);
            };

            const count = sum(neighbours, c => c.value);

            if (cell.value === 0 && count === 3 ){ //spawn
                const aliveNeighbours = neighbours.filter((c) => {
                    return c.isAlive();
                })

                commits.push([cell, 1]);
                // cell.meta.continuity +=1;
                // cell.hsl[0] = ((
                //     sum(aliveNeighbours, c => c.hsl[0]) / aliveNeighbours.length
                // ) + 10) % 360;
            } else if ( (cell.value ===1 ) && (count != 2 && count != 3)) { //die
                commits.push([cell, 0]);
                cell.meta.continuity = 0;
                cell.hsl[0] = 0;
                // cell.hsl[0] = cell.meta.continuity % 360;
            } else { //live
                cell.meta.continuity +=1;
                cell.hsl[0] = cell.meta.continuity % 360;
            }           

        };

        this.eachCell(dostuff);
        commits.forEach(([cell, value]) => { cell.value = value });
    }  
}