import React, { useEffect, useRef } from "react";

import GameOfLife from "./GameOfLife";

import mainStyle from "./main.module.css"

const Main = () => {
  const display = useRef<HTMLCanvasElement>(null);
  const game = useRef<GameOfLife | undefined>();

  useEffect(() => {
    const gameOf = new GameOfLife(250, 250, display.current!);
    gameOf.renderLoop();
  }, []);

  return (
    <div className={mainStyle.displayContainer}>
      <canvas ref={display} />
    </div>
  );
};

export default Main;
