import React, { Suspense } from "react";

import { useToggle } from "../../Hooks/useToggle";
import stylesApp from "./App.module.css";

const Main = React.lazy(() => import("../Main"));

const App: React.FC = () => {
  return (
    <main className={stylesApp.app}>
      <div id="mainScreen">
        <h2>Game of Life</h2>

        <Suspense fallback={null}>
          <Main />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
