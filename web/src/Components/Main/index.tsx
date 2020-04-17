import React, { useEffect, useRef } from "react";

import GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css";

import edit from "../../assets/edit.png";
import pause from "../../assets/pause.png";

const Main = () => {
  const display = useRef<HTMLCanvasElement>(null);
  const pauseRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const width = window.innerWidth < 650 ? 100 : 250;
    const height =
      window.innerWidth < 650 ? Math.round(window.innerHeight * 0.14) : 200;
    const gameOf = new GameOfLife(width, height, display.current!);
    const [render, toggle] = gameOf.renderLoop();
    render();
    pauseRef.current!.onclick = toggle
  }, []);

  return (
    <>
      <div className={mainStyle.header}>
        <h2>Game of Life</h2>
        <img alt="pause" className={mainStyle.icon} ref={pauseRef} src={pause} />
        <img alt="edit" className={mainStyle.icon} src={edit} />
      </div>

      <div className={mainStyle.displayContainer}>
        <canvas ref={display} />
      </div>
    </>
  );
};

export default Main;
