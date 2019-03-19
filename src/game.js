export default class Game {
  constructor(ctx, colors, timer) {
    this.ctx = ctx;
    this.colors = colors;
    this.timer = timer;
    this.handle = null;
  }

  start(grid) {
    this.grid = grid;
    this.cellSize = [
      this.ctx.canvas.width / this.grid.width,
      this.ctx.canvas.height / this.grid.height,
    ];
    this.queue();
  }

  stop() {
    this.timer.clear(this.handle);
    this.handle = null;
  }

  queue() {
    this.handle = this.timer.trigger(() => this.tick());
  }

  erase() {
    this.ctx.fillStyle = this.colors.clear;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.ctx.strokeStyle = this.colors.cellStroke
    this.ctx.fillStyle = this.colors.cellFill;

    this.grid.eachCell((cell, {
      row,
      column
    }) => {
      if (!cell.isAlive()) return;

      this.ctx.fillStyle = cell.color();

      const rect = [
        column * this.cellSize[0],
        row * this.cellSize[1],
        this.cellSize[0],
        this.cellSize[1],
      ];

      this.ctx.fillRect(...rect);
      this.ctx.strokeRect(...rect);

    });
  }

  tick() {
    this.grid.update();
    this.draw()
    this.erase();

    this.queue();
  }
}
