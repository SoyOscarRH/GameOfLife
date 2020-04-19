import React, { useEffect, useRef, useState, useCallback } from "react";
import { useToggle } from "../../Hooks/useToggle";

import { getInit, save as saveFile } from "./utils";
import { getDefaultValues } from "./defaultValues";
import * as GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css";
import headerStyle from "./header.module.css";
import { edit, save, pause, report } from "./icons";

const saveDoc = () => saveFile("data.txt", GameOfLife.getInfo());
const { width, height, size, density } = getDefaultValues();
const MainScreen = () => {
  const display = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    GameOfLife.create({ width, height, cell_size: size, canvas: display.current! });
    GameOfLife.render();
  }, []);

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
    if (measuring) window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, [measuring]);

  const [isPaused, setPause] = useState(false);
  const [isEditing, toggleEditing] = useToggle(false);

  const togglePause = () => {
    GameOfLife.toggle();
    setPause(e => !e);
  };

  useEffect(() => {
    if (!measuring) return;

    let id: NodeJS.Timeout;
    // @ts-ignore
    import("plotly.js-basic-dist").then(Plotly => {
      Plotly.newPlot("graph", [{ y: [], mode: "histogram", line: { color: "#00587a" } }], { plot_bgcolor: "7bb1b2", paper_bgcolor: "#a9cccd" });
      id = setInterval(() => Plotly.extendTraces("graph", { y: [[GameOfLife.aliveNow()]] }, [0]), 400);
    });

    return () => clearInterval(id)
  }, [measuring]);

  return (
    <>
      <header className={headerStyle.header}>
        <h2>Game of Life</h2>
        <img alt="save" src={save} onClick={saveDoc} />
        <img alt="pause" src={pause} onClick={togglePause} style={{ opacity: isPaused ? 0.7 : 1 }} />
        <img alt="edit" src={edit} onClick={toggleEditing} style={{ opacity: isEditing ? 1 : 0.7 }} />
        <img alt="report" src={report} onClick={toggleMeasuring} style={{ opacity: measuring ? 1 : 0.7 }} />
      </header>

      <section className={`${mainStyle.editing} ${isEditing ? mainStyle.visual : ""}`}>
        <label htmlFor="cellColor">Cell color: </label>
        <input id="cellColor" defaultValue={GameOfLife.ALIVE_COLOR} onChange={e => GameOfLife.setColor(e.target.value)} />

        <label htmlFor="cellBackColor">Background: </label>
        <input id="cellBackColor" defaultValue={GameOfLife.DEAD_COLOR} onChange={e => GameOfLife.setColorBack(e.target.value)} />

        <label htmlFor="nCells">Size of cells: </label>
        <input type="number" id="nCells" min="1" max="20" defaultValue={size} onChange={e => GameOfLife.setSize(e)} />

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

      <section className={mainStyle.displayContainer} onClick={() => setPause(true)}>
        <canvas ref={display} />
      </section>

      <section id="measuring" style={{ display: measuring ? "block" : "none" }}>
        <hr style={{ width: "80%", borderWidth: "0.1rem" }} />

        <h2>Analysis</h2>
        <div className={mainStyle.graph} id="graph" />
      </section>
    </>
  );
};

export default MainScreen;
