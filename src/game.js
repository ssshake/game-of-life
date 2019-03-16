export default class Game {
    constructor(ctx, grid, framesPerSecond){
        this.ctx = ctx;
        this.grid = grid;
        this.framesPerSecond = framesPerSecond;
    }

    generation = () => {
        this.ctx.clearRect(0, 0, this.grid.fieldSize, this.grid.fieldSize)

        drawGrid(this.ctx, this.grid)
        
        const gridOfNextGeneration = getNextGeneration(this.grid)
        
        setTimeout(() => {
        
            requestAnimationFrame(() => generation(this.ctx, gridOfNextGeneration))
        
        }, 
        1000 / this.framesPerSecond)
    }






    
}