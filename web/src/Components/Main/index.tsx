import React, { useEffect, useRef } from "react";

import { useToggle } from "../../Hooks/useToggle";

import * as GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css";

import { getDefaultValues, getInit } from "./utils";

import edit from "../../assets/edit.png";
import pause from "../../assets/pause.png";
import save from "../../assets/save.png";

// @ts-ignore
window.game = { ...GameOfLife };

const { width, height, size, density } = getDefaultValues();

const Main = () => {
  const display = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    GameOfLife.create({ width, height, cell_size: size, canvas: display.current! });
    GameOfLife.render();
  }, []);

  const [isPaused, togglePause] = useToggle(false, GameOfLife.toggle);
  const [isEditing, toggleEditing] = useToggle(false);

  const widthInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const densityInput = useRef<HTMLInputElement>(null);

  const startSimulation = () => {
    const width = parseInt(widthInput.current?.value!);
    const height = parseInt(heightInput.current?.value!);
    const density = parseFloat(densityInput.current?.value!);

    GameOfLife.stop();
    if (density !== -1) GameOfLife.create({ width, height, density });
    GameOfLife.drawCells();
    setTimeout(() => GameOfLife.render(), 1000);
    toggleEditing();
  };

  return (
    <>
      <div className={mainStyle.header}>
        <h2>Game of Life</h2>
        <img alt="save" className={mainStyle.icon} src={save} onClick={() => console.log(GameOfLife.getInfo())} />
        <img alt="pause" className={mainStyle.icon} src={pause} onClick={togglePause} style={{ opacity: isPaused ? 0.5 : 1 }} />
        <img alt="edit" className={mainStyle.icon} src={edit} onClick={toggleEditing} style={{ opacity: isEditing ? 1 : 0.5 }} />
      </div>

      <div className={`${mainStyle.editing} ${isEditing ? mainStyle.visual : ""}`}>
        <label htmlFor="cellColor">Cell color: </label>
        <input id="cellColor" defaultValue={GameOfLife.ALIVE_COLOR} onChange={e => GameOfLife.setColor(e.target.value)} />

        <label htmlFor="cellBackColor">Background: </label>
        <input id="cellBackColor" defaultValue={GameOfLife.DEAD_COLOR} onChange={e => GameOfLife.setColorBack(e.target.value)} />

        <label htmlFor="nCells">Size of cells: </label>
        <input type="number" id="nCells" min="1" max="10" defaultValue={size} onChange={e => GameOfLife.setSize(e)} />

        <label htmlFor="width">Width: </label>
        <input type="number" defaultValue={width} id="width" step="20" min="20" max="1000" ref={widthInput} />

        <label htmlFor="height">Height: </label>
        <input type="number" defaultValue={height} id="height" step="20" min="20" max="1000" ref={heightInput} />

        <label htmlFor="density">Density: </label>
        <input type="number" defaultValue={density} id="density" step="0.1" min="0" max="1" ref={densityInput} />

        <input type="file" id="file" onChange={e => getInit(e, widthInput, heightInput, densityInput)} />

        <button onClick={startSimulation}>Simulate automata</button>
      </div>

      <div className={mainStyle.displayContainer}>
        <canvas ref={display} />
      </div>
    </>
  );
};

export default Main;
