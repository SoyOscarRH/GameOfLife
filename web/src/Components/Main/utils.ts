import { RefObject, ChangeEvent } from "react";
import * as GameOfLife from "./GameOfLife";

const getDefaultValues = () => {
  const isMobile = window.innerWidth < 650;
  const width = isMobile ? 100 : 250;
  const height = isMobile ? Math.round(window.innerHeight * 0.14) : 200;
  const size = isMobile ? 5 : 4;
  const density = 0.3;

  return { width, height, size, density };
};

type eventInput = ChangeEvent<HTMLInputElement>;
type input = RefObject<HTMLInputElement>;

const getInit = (e: eventInput, widthInput: input, heightInput: input, densityInput: input) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = e => {
    const text = e.target?.result as string;
    const lines = text.split("\n").map(line => line.split("").map(i => parseInt(i)));

    GameOfLife.stop();
    const rows = lines.length;
    const cols = lines[0].length;
    widthInput.current!.value = cols.toString();
    heightInput.current!.value = rows.toString();
    densityInput.current!.value = "-1";

    GameOfLife.create({ width: cols, height: rows });

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        GameOfLife.set(i, j, lines[i][j] as 0 | 1);
      }
    }

    GameOfLife.drawCells();
  };
};


const save = (filename: string, text: string) => {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.click()
}

export { getDefaultValues, getInit, save };
