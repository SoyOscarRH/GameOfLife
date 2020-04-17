import React, { useEffect, useRef } from "react";

import GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css"

const Main = () => {
  const display = useRef<HTMLCanvasElement>(null);
  const game = useRef<GameOfLife | undefined>();

  useEffect(() => {
    const width = window.innerWidth < 650? 100 : 250;
    const height = window.innerWidth < 650? Math.round(window.innerHeight * 0.14) : 200;
    const gameOf = new GameOfLife(width, height, display.current!);
    gameOf.renderLoop();
  }, []);

  return (
    <div className={mainStyle.displayContainer}>
      <canvas ref={display} />
    </div>
  );
};

export default Main;
