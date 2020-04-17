import { memory } from "game-of-life-algorithm/game_of_life_algorithm_bg";
import { Universe, Cell } from "game-of-life-algorithm";

class GameofLife {
  readonly cell_size: number;
  readonly cell_space: number;
  readonly width: number;
  readonly height: number;

  DEAD_COLOR = "#393e4a";
  ALIVE_COLOR = "#989fb0";

  cells = new Uint8Array();
  universe: Universe;
  context: CanvasRenderingContext2D;
  id = 0;

  constructor(cell_size: number, width: number, height: number, canvas: HTMLCanvasElement) {
    this.width = width;
    this.height = height;
    this.cell_size = cell_size;
    this.cell_space = this.cell_size + 1;
    this.universe = Universe.create(width, height);

    canvas.height = this.cell_space * height + 1;
    canvas.width = this.cell_space * width + 1;

    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.drawCells();

    canvas.addEventListener("click", (event) => {
      if (this.isRunning()) return
      const boundingRect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / boundingRect.width;
      const scaleY = canvas.height / boundingRect.height;

      const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
      const canvasTop = (event.clientY - boundingRect.top) * scaleY;

      const row = Math.min(Math.floor(canvasTop / this.cell_space), height - 1);
      const col = Math.min(Math.floor(canvasLeft / this.cell_space), width - 1);

      this.universe.toggle_cell(row, col);

      this.drawCells();
    });
  }

  drawCells() {
    const cellsPointer = this.universe.cells();
    const size = this.width * this.height;
    this.cells = new Uint8Array(memory.buffer, cellsPointer, size);

    this.context.beginPath();

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.context.fillStyle = this.getColor(row, col);
        const x = col * this.cell_space + 1;
        const y = row * this.cell_space + 1;
        this.context.fillRect(x, y, this.cell_size, this.cell_size);
      }
    }

    this.context.stroke();
  }

  getColor(row: number, column: number) {
    const { DEAD_COLOR, ALIVE_COLOR } = this;
    const index = this.width * row + column;
    return this.cells[index] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
  }

  isRunning() {
    return !!this.id;
  }

  renderLoop(): [() => void, () => void] {
    const render = () => {
      this.universe.tick();
      this.drawCells();
      this.id = requestAnimationFrame(render);
    };

    const toggle = () => {
      if (!this.isRunning()) return render();
      cancelAnimationFrame(this.id);
      this.id = 0;
    };
    return [render, toggle];
  }
}

export default GameofLife;
