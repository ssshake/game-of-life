export default class Game {
    constructor(ctx, colors, timer){
        this.ctx = ctx;
        this.colors = colors;
        this.timer = timer;
        this.handle = null;
        this.cursor = null;
    }

    start(grid) {
        this.grid = grid;
        this.cellSize = [
            this.ctx.canvas.width / this.grid.width,
            this.ctx.canvas.height / this.grid.height,
        ]
        this.queue();
    }

    stop() {
        this.timer.clear(this.hanle);
        this.handle = null;
    }

    queue(){
        this.handle = this.timer.trigger( () => this.tick() );
    }

    setCursor(cursorTuple) {
        this.cursor = cursorTuple.map((value, axis) => {
            return Math.floor ( value, this.cellSize[axis] * this.cellSize[axis] )
        });
    }

    removeCursor() {
        this.cursor = null;
    }

    erase() {
        this.ctx.fillStyle = this.colors.clear;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.ctx.strokeStyle = this.colors.cellStroke;
        this.ctx.fillStyle = this.colors.cellFill;

        const dostuff = (cell, {row, column}) => {
            if (!cell.isAlive()){
                return;
            }

            this.ctx.fillStyle = cell.color();
            // this.ctx.strokeStyle = cell.color();

            const rect = [
                column * this.cellSize[0],
                row * this.cellSize[1], //perhaps an object instead, this.cellSize.x or row
                this.cellSize[0],
                this.cellSize[1],
            ];

            this.ctx.fillRect(...rect);
            this.ctx.strokeRect(...rect);
        };
        
        this.grid.eachCell(dostuff);
    }

    drawCursor() {
        if (!this.cursor) {
            return;
        }

        this.ctx.fillStyle = "#FF00FF";
        this.ctx.fillRect(
            this.cursor[0],
            this.cursor[1],
            this.cellSize[0],
            this.cellSize[1],

        );
    }

    tick() {
        this.erase();
        this.grid.update();
        this.draw();
        this.drawCursor();
        this.queue();
    }
}