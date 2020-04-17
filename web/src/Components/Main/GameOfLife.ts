import { memory } from "game-of-life-algorithm/game_of_life_algorithm_bg";
import { Universe, Cell } from "game-of-life-algorithm";

class GameofLife {
  readonly cell_size = 5;
  readonly cell_space = this.cell_size + 1;
  readonly width: number;
  readonly height: number;

  DEAD_COLOR = "#393e4a";
  ALIVE_COLOR = "#989fb0";

  cells = new Uint8Array();
  universe: Universe;
  context: CanvasRenderingContext2D;

  constructor(width: number, height: number, canvas: HTMLCanvasElement) {
    this.width = width;
    this.height = height;
    this.universe = Universe.create(width, height);

    canvas.height = this.cell_space * height + 1;
    canvas.width = this.cell_space * width + 1;

    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.drawCells();
  }

  drawCells() {
    const cellsPointer = this.universe.cells();
    const size = this.width * this.height;
    this.cells = new Uint8Array(memory.buffer, cellsPointer, size);

    this.context.beginPath();

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.context.fillStyle = this.getColor(row, col);
        const x = col * this.cell_space + 1,
          y = row * this.cell_space + 1;
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

  renderLoop(): [() => void, () => void] {
    let id: null | number = null;
    const render = () => {
      this.universe.tick();
      this.drawCells();
      id = requestAnimationFrame(render);
    };

    const toggle = () => {
      if (!id) return render();
      cancelAnimationFrame(id);
      id = null;
    };
    return [render, toggle];
  }
}

export default GameofLife;
