import { memory } from "game-of-life-algorithm/game_of_life_algorithm_bg";
import { Universe, Cell } from "game-of-life-algorithm";

const get_random = <T>(x: Array<T>) => x[Math.floor(Math.random() * x.length)];
let [DEAD_COLOR, ALIVE_COLOR] = get_random([
  ["#00587a", "#7bb1b2"],
  ["#511845", "#efa8e4"],
  ["#3b6978", "#dee3e2"],
  ["#721b65", "#ffd868"],
  ["#5f6caf", "#8ac6d1"],
]);

let cell_size: number;
let cell_space: number;
let width: number;
let height: number;

let cells = new Uint8Array();
let id = 0;

let universe: Universe;
let context: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

const setUpCanvas = () => {
  canvas.height = cell_space * height + 1;
  canvas.width = cell_space * width + 1;

  context = canvas.getContext("2d") as CanvasRenderingContext2D;

  drawCells();

  canvas.onclick = event => {
    if (isRunning()) stop();

    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / cell_space), height - 1);
    const col = Math.min(Math.floor(canvasLeft / cell_space), width - 1);

    universe.toggle_cell(row, col);
    paintPoint(context, row, col);
  };
};

type rules = [number, number, number, number];
const create = (data: { width: number; height: number; density?: number; cell_size?: number; canvas?: HTMLCanvasElement; rules?: rules }) => {
  canvas = data.canvas ?? canvas;
  cell_size = data.cell_size ?? cell_size;
  cell_space = cell_size + 1;

  width = data.width;
  height = data.height;
  let rules = data.rules ?? [2, 3, 3, 3];

  universe = Universe.create(width, height, 0.1, ...rules);
  if (data.density == null) universe.cool_start();
  setUpCanvas();
};

const paintPoint = (context: CanvasRenderingContext2D, row: number, col: number) => {
  context.fillStyle = getColor(row, col);
  const x = col * cell_space + 1;
  const y = row * cell_space + 1;
  context.fillRect(x, y, cell_size, cell_size);
};

const isRunning = () => id !== 0;

const drawDifferentCells = () => {
  const num_changes = universe.how_many_changes();
  let changes = new Uint32Array(memory.buffer, universe.changes(), universe.how_many_changes());
  cells = new Uint8Array(memory.buffer, universe.cells(), width * height);

  context.beginPath();

  for (let i = 0; i < num_changes; i += 2) {
    const row = changes[i];
    const col = changes[i + 1];
    const index = width * row + col;

    context.fillStyle = cells[index] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
    const x = col * cell_space + 1;
    const y = row * cell_space + 1;
    context.fillRect(x, y, cell_size, cell_size);
  }

  context.stroke();
};

const drawCells = () => {
  cells = new Uint8Array(memory.buffer, universe.cells(), width * height);

  context.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      paintPoint(context, row, col);
    }
  }

  context.stroke();
};

const get = (row: number, column: number) => {
  const index = width * row + column;
  return cells[index];
};

const getInfo = () => {
  const data = [];

  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) data.push(get(i, j) === Cell.Dead ? 0 : 1);
    data.push("\n");
  }

  return data.join("");
};

const getColor = (row: number, column: number) => (get(row, column) === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR);

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
  drawDifferentCells();
  id = requestAnimationFrame(render);
};

const setColor = (color: string) => (ALIVE_COLOR = color);
const setColorBack = (color: string) => (DEAD_COLOR = color);

const aliveNow = () => universe.alive_now();

const setSize = (event: React.ChangeEvent<HTMLInputElement>) => {
  cell_size = parseInt(event.target.value);
  cell_space = cell_size + 1;
  setUpCanvas();
};

const set = (row: number, cols: number, val: 0 | 1) => universe.set(row, cols, val ? Cell.Alive : Cell.Dead);

export {
  create,
  aliveNow,
  drawCells,
  set,
  render,
  toggle,
  stop,
  isRunning,
  setColor,
  setColorBack,
  setSize,
  setUpCanvas,
  getInfo,
  ALIVE_COLOR,
  DEAD_COLOR,
};
