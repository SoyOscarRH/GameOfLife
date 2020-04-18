import { memory } from "game-of-life-algorithm/game_of_life_algorithm_bg";
import { Universe, Cell } from "game-of-life-algorithm";

let DEAD_COLOR = "#393e4a";
let ALIVE_COLOR = "#989fb0";

let cell_size: number;
let cell_space: number;
let width: number;
let height: number;

let cells = new Uint8Array();
let id = 0;

let universe: Universe;
type context = CanvasRenderingContext2D;
let context: context;

const create = (data: { width: number; height: number; density?: number; cell_size?: number }) => {
  if (data.cell_size != null) {
    cell_size = data.cell_size;
    cell_space = cell_size + 1;
  }

  width = data.width;
  height = data.height;

  universe = data.density != null ? Universe.create(width, height, data.density) : Universe.default_start(width, height);
};

const paintPoint = (context: context, row: number, col: number) => {
  context.fillStyle = getColor(row, col);
  const x = col * cell_space + 1;
  const y = row * cell_space + 1;
  context.fillRect(x, y, cell_size, cell_size);
};

const isRunning = () => id !== 0;
const attach = (canvas: HTMLCanvasElement) => {
  canvas.height = cell_space * height + 1;
  canvas.width = cell_space * width + 1;

  context = canvas.getContext("2d") as context;
  drawCells();

  canvas.addEventListener("click", event => {
    if (isRunning()) return;
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / cell_space), height - 1);
    const col = Math.min(Math.floor(canvasLeft / cell_space), width - 1);

    universe.toggle_cell(row, col);
    paintPoint(context, row, col);
  });
};

const drawCells = () => {
  const cellsPointer = universe.cells();
  const size = width * height;
  cells = new Uint8Array(memory.buffer, cellsPointer, size);

  context.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      paintPoint(context, row, col);
    }
  }

  context.stroke();
};

const getColor = (row: number, column: number) => {
  const index = width * row + column;
  return cells[index] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
};

const toggle = () => {
  if (!isRunning()) return render();
  cancelAnimationFrame(id);
  id = 0;
};

const stop = () => {
  cancelAnimationFrame(id);
  id = 0;
};

const render = () => {
  universe.tick();
  drawCells();
  id = requestAnimationFrame(render);
};

const setColor = (color: string) => (ALIVE_COLOR = color);
const setColorBack = (color: string) => (DEAD_COLOR = color);
const setSize = (size: number, canvas: HTMLCanvasElement) => {
  cell_size = size;
  cell_space = cell_size + 1;
  attach(canvas);
};

const set = (row: number, cols: number, val: 0 | 1) => universe.set(row, cols, val ? Cell.Alive : Cell.Dead);

export {
  create,
  attach,
  drawCells,
  set,
  render,
  toggle,
  stop,
  isRunning,
  setColor,
  setColorBack,
  setSize,
  ALIVE_COLOR,
  DEAD_COLOR,
};
