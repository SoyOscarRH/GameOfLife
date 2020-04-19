import { RefObject, ChangeEvent } from "react";
import * as GameOfLife from "./GameOfLife";

const save = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.click();
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
    const [rows, cols] = [lines.length, lines[0].length];
    widthInput.current!.value = cols.toString();
    heightInput.current!.value = rows.toString();
    densityInput.current!.value = "-1";
    GameOfLife.create({ width: cols, height: rows });

    for (let i = 0; i < rows; ++i)
      for (let j = 0; j < cols; ++j) 
        GameOfLife.set(i, j, lines[i][j] as 0 | 1);

    GameOfLife.drawCells();
  };
};

export { getInit, save };
