import React, { useEffect, useRef } from "react";

import { useToggle } from "../../Hooks/useToggle";
import { useInput } from "../../Hooks/useInput";

import * as GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css";

import edit from "../../assets/edit.png";
import pause from "../../assets/pause.png";
import { getDefaultValues } from "./utils";

const { width, height, size, startDensity } = getDefaultValues();

const Main = () => {
  const display = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    GameOfLife.create({width, height, cell_size: size});
    GameOfLife.attach(display.current!);
    GameOfLife.render();
  }, []);

  const [isPaused, togglePause] = useToggle(false, GameOfLife.toggle);
  const [isEditing, toggleEditing] = useToggle(false, GameOfLife.toggle);

  const [cellWidth, bindcellWidth] = useInput(width);
  const [cellHeight, bindcellHeight] = useInput(height);
  const [density, bindDensity] = useInput(startDensity);

  const getInit = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      GameOfLife.create({width: cols, height: rows});

      for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
          GameOfLife.set(i, j, lines[i][j] as 0 | 1);
        }
      }

      GameOfLife.attach(display.current!);
      GameOfLife.drawCells();
      setTimeout(() => GameOfLife.render(), 1200);
    };
  };

  return (
    <>
      <div className={mainStyle.header}>
        <h2>Game of Life</h2>
        <img alt="pause" className={mainStyle.icon} src={pause} onClick={togglePause} style={{ opacity: isPaused ? 0.5 : 1 }} />
        <img alt="edit" className={mainStyle.icon} src={edit} onClick={toggleEditing} style={{ opacity: isEditing ? 0.5 : 1 }} />
      </div>

      <div className={`${mainStyle.editing} ${isEditing ? mainStyle.visual : ""}`}>
        <label htmlFor="cellColor">Cell color: </label>
        <input id="cellColor" defaultValue={GameOfLife.ALIVE_COLOR} onBlur={e => GameOfLife.setColor(e.target.value)} />
        <label htmlFor="cellBackColor">Background: </label>
        <input id="cellBackColor" defaultValue={GameOfLife.DEAD_COLOR} onBlur={e => GameOfLife.setColorBack(e.target.value)} />
        <label htmlFor="nCells">Size of cells: </label>
        <input
          id="nCells"
          min="1"
          max="10"
          defaultValue={size}
          onBlur={e => GameOfLife.setSize(parseInt(e.target.value), display.current!)}
        />

        <label htmlFor="width">Width: </label>
        <input id="width" step="20" min="20" max="1000" {...bindcellWidth} />
        <label htmlFor="height">Height: </label>
        <input id="height" step="20" min="20" max="1000" {...bindcellHeight} />
        <label htmlFor="height">Density: </label>
        <input id="height" step="0.1" min="0" max="1" {...bindDensity} />
        <input type="file" id="file" onChange={getInit} />
        <button
          onClick={() => {
            GameOfLife.stop();
            GameOfLife.create({width: cellWidth, height: cellHeight, density});
            GameOfLife.attach(display.current!);
            GameOfLife.drawCells();
            setTimeout(() => GameOfLife.render(), 1200);
          }}
        >
          Simulate automata
        </button>
      </div>

      <div className={mainStyle.displayContainer}>
        <canvas ref={display} />
      </div>
    </>
  );
};

export default Main;
