import React, { useEffect, useRef, useState, useCallback } from "react";

import { useToggle } from "../../Hooks/useToggle";

import * as GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css";

import { getDefaultValues, getInit, save as saveFile } from "./utils";

import edit from "../../assets/edit.png";
import pause from "../../assets/pause.png";
import save from "../../assets/save.png";

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

  const survival = useRef<HTMLInputElement>(null);
  const birth = useRef<HTMLInputElement>(null);

  const [reset, needsReset] = useState(false);
  const forceReset = useCallback(() => needsReset(true), []);

  const startSimulation = () => {
    try {
      const width = parseInt(widthInput.current?.value!);
      const height = parseInt(heightInput.current?.value!);
      const density = parseFloat(densityInput.current?.value!);

      const [smin, smax] = survival.current!.value.split(", ").map(e => parseInt(e));
      const [bmin, bmax] = birth.current!.value.split(", ").map(e => parseInt(e));

      GameOfLife.stop();
      if (reset) {
        needsReset(false);
        GameOfLife.create({ width, height, density, rules: [smin, smax, bmin, bmax] });
      }
      GameOfLife.drawCells();
      setTimeout(() => GameOfLife.render(), 1000);
      toggleEditing();
    } catch (e) {
      alert("Error: wrong inputs");
    }
  };
  const [measuring, toggleMeasuring] = useToggle(false);
  useEffect(() => {
    
  }, [measuring]);

  const clickMeasure = () => {
    toggleMeasuring();
    let node = document.getElementById("measuring");
    setTimeout(() => node?.scrollIntoView({ behavior: "smooth", block: "end" }), 300);
  };

  return (
    <>
      <header className={mainStyle.header}>
        <h2>Game of Life</h2>
        <img alt="save" className={mainStyle.icon} src={save} onClick={() => saveFile("data.txt", GameOfLife.getInfo())} />
        <img alt="pause" className={mainStyle.icon} src={pause} onClick={togglePause} style={{ opacity: isPaused ? 0.5 : 1 }} />
        <img alt="edit" className={mainStyle.icon} src={edit} onClick={toggleEditing} style={{ opacity: isEditing ? 1 : 0.5 }} />
        <img alt="edit" className={mainStyle.icon} src={edit} onClick={clickMeasure} style={{ opacity: measuring ? 1 : 0.5 }} />
      </header>

      <section className={`${mainStyle.editing} ${isEditing ? mainStyle.visual : ""}`}>
        <label htmlFor="cellColor">Cell color: </label>
        <input id="cellColor" defaultValue={GameOfLife.ALIVE_COLOR} onChange={e => GameOfLife.setColor(e.target.value)} />

        <label htmlFor="cellBackColor">Background: </label>
        <input id="cellBackColor" defaultValue={GameOfLife.DEAD_COLOR} onChange={e => GameOfLife.setColorBack(e.target.value)} />

        <label htmlFor="nCells">Size of cells: </label>
        <input type="number" id="nCells" min="1" max="10" defaultValue={size} onChange={e => GameOfLife.setSize(e)} />

        <label htmlFor="width">Width: </label>
        <input type="number" defaultValue={width} id="width" step="20" min="20" max="1000" ref={widthInput} onChange={forceReset} />

        <label htmlFor="height">Height: </label>
        <input type="number" defaultValue={height} id="height" step="20" min="20" max="1000" ref={heightInput} onChange={forceReset} />

        <label htmlFor="density">Density: </label>
        <input type="number" defaultValue={density} id="density" step="0.1" min="0" max="1" ref={densityInput} onChange={forceReset} />

        <label htmlFor="survival">R(S_min, S_max): </label>
        <input defaultValue={"2, 3"} id="survival" ref={survival} onChange={forceReset} />

        <label htmlFor="birth">R(B_min, B_max): </label>
        <input defaultValue={"3, 3"} id="birth" ref={birth} onChange={forceReset} />

        <input type="file" id="file" onChange={e => getInit(e, widthInput, heightInput, densityInput)} />
        <button onClick={startSimulation}>Simulate automata</button>
      </section>

      <section className={mainStyle.displayContainer}>
        <canvas ref={display} />
      </section>

      <section id="measuring" style={{ display: measuring ? "block" : "none" }}>
        <hr style={{ width: "80%", borderWidth: "0.1rem" }} />

        <h2>Analysis</h2>
        <div>
          <p>Average: </p>
          <p>Variance: </p>
        </div>
        <div id="graph" />
      </section>
    </>
  );
};

export default Main;
